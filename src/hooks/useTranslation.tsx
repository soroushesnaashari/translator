
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useTranslation() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  // Mock translation function that simulates API translation
  // In a production app, this would be replaced with a real API call
  const translateText = async (text: string, from: string, to: string) => {
    if (!text) {
      setTranslatedText('');
      return;
    }
    
    setIsTranslating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Enhanced mock translation with language-specific patterns
      let mockResult = text;
      
      // Apply some simple pattern replacements based on target language
      // This is just to simulate different languages, not actual translation
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
          // Simple Persian placeholder replacements
          mockResult = text
            .replace(/the /gi, 'آن ')
            .replace(/is /gi, 'است ')
            .replace(/hello/gi, 'سلام')
            .replace(/world/gi, 'دنیا');
          break;
        default:
          // Add prefix to show it's a simulated translation
          mockResult = `[${from}->${to}] ${text}`;
      }
      
      setTranslatedText(mockResult);
      
      // Show success message for the first translation only
      if (translatedText === '') {
        toast({
          title: "Translation complete",
          description: "Using simulated translation. Connect to a real API for production use.",
          duration: 3000,
        });
      }
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
