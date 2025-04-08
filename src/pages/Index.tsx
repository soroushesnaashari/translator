
import React from 'react';
import { TranslatingTitle } from '@/components/TranslatingTitle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { TranslationBox } from '@/components/TranslationBox';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Index = () => {
  const {
    sourceText,
    setSourceText,
    translatedText,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    isTranslating,
    swapLanguages
  } = useTranslation();
  
  return (
    <div className="min-h-screen w-full">
      <main className="container max-w-5xl py-8 px-4 md:py-12">
        <TranslatingTitle />
        
        <div className="mb-8">
          <p className="text-center text-muted-foreground max-w-md mx-auto">
            A professional translation tool for developers and content creators, 
            providing fast and accurate translations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="space-y-3">
            <LanguageSelector 
              value={sourceLang} 
              onChange={setSourceLang} 
              label="Source Language" 
            />
            <TranslationBox 
              value={sourceText} 
              onChange={setSourceText}
              placeholder="Enter text to translate..."
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <LanguageSelector 
                value={targetLang} 
                onChange={setTargetLang} 
                label="Target Language" 
              />
              <div className="hidden lg:block">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={swapLanguages}
                  className="mt-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            <TranslationBox 
              value={translatedText} 
              isReadOnly={true}
              placeholder={isTranslating ? "Translating..." : "Translation will appear here..."}
            />
          </div>
          
          <div className="lg:hidden flex justify-center my-2">
            <Button 
              variant="outline" 
              onClick={swapLanguages}
              className="w-full max-w-xs"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Swap Languages
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        <footer className="mt-16 text-center text-xs text-muted-foreground">
          <p>Developer-focused translation tool &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Currently using mock translations for demonstration purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
