
import React from 'react';
import { TranslatingTitle } from '@/components/TranslatingTitle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { TranslationBox } from '@/components/TranslationBox';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Globe, Github, Linkedin, Twitter } from 'lucide-react';

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

        <div className="mb-12">
          <p className="text-center text-muted-foreground max-w-md mx-auto">
            A professional translation tool created by<br />
            <span className="font-mono font-bold">Mohammad Soroush Esnaashari</span>
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
              isLoading={false}
            />
          </div>

          <div className="space-y-3">
            <LanguageSelector
              value={targetLang}
              onChange={setTargetLang}
              label="Target Language"
            />
            <TranslationBox
              value={translatedText}
              isReadOnly={true}
              placeholder="Translation will appear here..."
              isLoading={isTranslating}
            />
          </div>
        </div>

        <div className="flex justify-center my-6">
          <Button
            variant="outline"
            onClick={swapLanguages}
            className="w-auto"
            size="sm"
            disabled={isTranslating}
          >
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Swap Languages
          </Button>
        </div>

        <footer className="mt-24 text-center text-muted-foreground">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://soroushesnaashari.github.io/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Globe className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/soroushesnaashari" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://github.com/soroushesnaashari" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://x.com/srshesn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm">© 2025 Mohammad Soroush Esnaashari</p>
          <p className="mt-1 text-xs">Connected to MyMemory Translation API.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
