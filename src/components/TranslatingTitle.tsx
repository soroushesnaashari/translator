
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
    }, 700); // Increased transition time for smoother effect
  }, [currentLang, languages]);
  
  useEffect(() => {
    const interval = setInterval(changeLang, 4000); // Increased interval for better readability
    return () => clearInterval(interval);
  }, [changeLang]);
  
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl rounded-full -z-10"></div>
      <span className={`inline-block transition-opacity duration-700 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
        {translatorTitle[currentLang]}
      </span>
    </h1>
  );
}
