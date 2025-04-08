
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language, languages } from '@/lib/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-muted-foreground mb-2 block">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-secondary border-border/40">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code} className="flex items-center">
              <span className="font-mono text-xs text-muted-foreground mr-2">
                {language.code}
              </span>
              <span>{language.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {language.nativeName}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
