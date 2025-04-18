import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeSnippet({
  code,
  language = 'tsx',
  title,
  className,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'rounded-md border border-input-border overflow-hidden',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-black/30">
        <div className="text-sm font-medium text-label-text">
          {title || `${language} example`}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs px-2 py-1 rounded-md hover:bg-grey-hover transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-xs overflow-x-auto bg-black/20 font-mono">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
