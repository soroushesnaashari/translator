
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
        duration: 2000,
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleCopy}
      className={`h-8 w-8 ${className}`}
      title="Copy to clipboard"
    >
      {isCopied ? (
        <CheckIcon className="h-4 w-4 text-accent" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
