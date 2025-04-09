
import React from 'react';
import { CopyButton } from './CopyButton';
import { Loader2 } from 'lucide-react';

interface TranslationBoxProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isReadOnly?: boolean;
  minHeight?: string;
  isLoading?: boolean;
}

export function TranslationBox({ 
  value, 
  onChange, 
  placeholder = "Enter text...", 
  isReadOnly = false,
  minHeight = "200px",
  isLoading = false
}: TranslationBoxProps) {
  return (
    <div className="glass-card w-full relative rounded-md overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm z-20 rounded-md">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Translating...</span>
          </div>
        </div>
      )}
      <div className="absolute top-2 right-2 z-10">
        <CopyButton text={value} />
      </div>
      <textarea
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={isReadOnly || isLoading}
        className={`code-editor w-full resize-none p-4 ${isReadOnly ? 'bg-codeblock/50' : ''}`}
        style={{ minHeight }}
      />
    </div>
  );
}
