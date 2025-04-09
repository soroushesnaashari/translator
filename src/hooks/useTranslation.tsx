
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

// LibreTranslate API URLs we can try
const LIBRE_TRANSLATE_ENDPOINTS = [
  'https://translate.argosopentech.com/translate',
  'https://libretranslate.de/translate',
  'https://translate.terraprint.co/translate'
];

export function useTranslation() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  // Function to translate text using LibreTranslate API
  const translateText = async (text: string, from: string, to: string) => {
    if (!text) {
      setTranslatedText('');
      return;
    }
    
    setIsTranslating(true);
    
    // Try each endpoint until one works
    for (const endpoint of LIBRE_TRANSLATE_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({
            q: text,
            source: from,
            target: to,
            format: 'text'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.translatedText) {
          setTranslatedText(data.translatedText);
          
          // Show success toast only on first successful translation
          if (translatedText === '') {
            toast({
              title: "Translation complete",
              description: "Connected to LibreTranslate API",
              duration: 3000,
            });
          }
          
          setIsTranslating(false);
          return; // Exit after successful translation
        }
      } catch (error) {
        console.error(`Error with endpoint ${endpoint}:`, error);
        // Continue to next endpoint if this one failed
      }
    }
    
    // If we got here, all endpoints failed - fall back to mock translation
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
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "Could not translate the text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
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
