import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CodeSnippet } from './code-snippet';

interface ComponentExampleProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  language?: string;
  className?: string;
}

export function ComponentExample({
  title,
  description,
  children,
  code,
  language = 'tsx',
  className,
}: ComponentExampleProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs px-3 py-1 rounded-md bg-input-bg text-label-text border border-input-border hover:bg-grey-hover transition-colors"
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      {description && <p className="text-sm text-label-text">{description}</p>}

      <div className="p-4 border border-dashed border-input-border rounded-md">
        {children}
      </div>

      {showCode && (
        <CodeSnippet code={code} language={language} title={`${title} code`} />
      )}
    </div>
  );
}
