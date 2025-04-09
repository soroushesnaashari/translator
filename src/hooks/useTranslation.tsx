
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

// MyMemory API is more reliable and CORS-friendly for browser-based apps
const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';

export function useTranslation() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  // Function to translate text using MyMemory API
  const translateText = async (text: string, from: string, to: string) => {
    if (!text) {
      setTranslatedText('');
      return;
    }
    
    setIsTranslating(true);
    
    try {
      // MyMemory API doesn't require POST, works with GET which has fewer CORS issues
      const url = `${MYMEMORY_API_URL}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.responseData && data.responseData.translatedText) {
        let translatedContent = data.responseData.translatedText;
        
        // Clean up HTML entities that sometimes come in the response
        translatedContent = translatedContent
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
          
        setTranslatedText(translatedContent);
        
        // Show success toast only on first successful translation
        if (translatedText === '') {
          toast({
            title: "Translation complete",
            description: "Connected to MyMemory Translation API",
            duration: 3000,
          });
        }
        
        setIsTranslating(false);
        return;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Translation API error:', error);
      
      // Fall back to mock translation
      try {
        // Enhanced mock translation with language-specific patterns
        let mockResult = text;
        
        // Apply some simple pattern replacements based on target language
        switch (to) {
          case 'es':
            mockResult = text
              .replace(/the /gi, 'el ')
              .replace(/is /gi, 'es ')
              .replace(/hello/gi, 'hola')
              .replace(/world/gi, 'mundo');
            break;
          case 'fr':
            mockResult = text
              .replace(/the /gi, 'le ')
              .replace(/is /gi, 'est ')
              .replace(/hello/gi, 'bonjour')
              .replace(/world/gi, 'monde');
            break;
          case 'de':
            mockResult = text
              .replace(/the /gi, 'die ')
              .replace(/is /gi, 'ist ')
              .replace(/hello/gi, 'hallo')
              .replace(/world/gi, 'welt');
            break;
          case 'fa':
            mockResult = text
              .replace(/the /gi, 'آن ')
              .replace(/is /gi, 'است ')
              .replace(/hello/gi, 'سلام')
              .replace(/world/gi, 'دنیا');
            break;
          default:
            mockResult = `[${from}->${to}] ${text}`;
        }
        
        setTranslatedText(mockResult);
        toast({
          title: "API Translation failed",
          description: "Using fallback mock translation. Real API services unavailable.",
          variant: "destructive",
        });
      } catch (fallbackError) {
        toast({
          title: "Translation failed",
          description: "Could not translate the text. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsTranslating(false);
      }
    }
  };

  // Debounced translation
  useEffect(() => {
    const debounceTime = setTimeout(() => {
      if (sourceText) {
        translateText(sourceText, sourceLang, targetLang);
      }
    }, 500);
    
    return () => clearTimeout(debounceTime);
  }, [sourceText, sourceLang, targetLang]);

  // Swap languages
  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText('');
    // Translating will be triggered by the useEffect when sourceText changes
  };

  return {
    sourceText,
    setSourceText,
    translatedText,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    isTranslating,
    swapLanguages
  };
}
