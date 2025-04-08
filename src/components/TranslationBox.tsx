
import React from 'react';
import { CopyButton } from './CopyButton';

interface TranslationBoxProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isReadOnly?: boolean;
  minHeight?: string;
}

export function TranslationBox({ 
  value, 
  onChange, 
  placeholder = "Enter text...", 
  isReadOnly = false,
  minHeight = "200px"
}: TranslationBoxProps) {
  return (
    <div className="glass-card w-full relative">
      <div className="absolute top-2 right-2 z-10">
        <CopyButton text={value} />
      </div>
      <textarea
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={isReadOnly}
        className={`code-editor w-full resize-none ${isReadOnly ? 'bg-codeblock/50' : ''}`}
        style={{ minHeight }}
      />
    </div>
  );
}
