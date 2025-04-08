
import React, { useState, useEffect, useCallback } from 'react';
import { translatorTitle } from '@/lib/languages';

export function TranslatingTitle() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isChanging, setIsChanging] = useState(false);
  const languages = Object.keys(translatorTitle);
  
  const changeLang = useCallback(() => {
    setIsChanging(true);
    setTimeout(() => {
      const currentIndex = languages.indexOf(currentLang);
      const nextIndex = (currentIndex + 1) % languages.length;
      setCurrentLang(languages[nextIndex]);
      setIsChanging(false);
    }, 500);
  }, [currentLang, languages]);
  
  useEffect(() => {
    const interval = setInterval(changeLang, 3000);
    return () => clearInterval(interval);
  }, [changeLang]);
  
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
      <span className={`inline-block ${isChanging ? 'animate-fade-out' : 'animate-fade-in'}`}>
        {translatorTitle[currentLang]}
      </span>
    </h1>
  );
}
