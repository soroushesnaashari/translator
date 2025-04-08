
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useTranslation() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  // This is a mock translation function
  // In a real application, you would replace this with an API call
  const translateText = async (text: string, from: string, to: string) => {
    if (!text) {
      setTranslatedText('');
      return;
    }
    
    setIsTranslating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock translation (in a real app, replace with actual API call)
      // This just adds language codes to demonstrate the UI flow
      const mockResult = `[${from}->${to}] ${text}`;
      setTranslatedText(mockResult);
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
