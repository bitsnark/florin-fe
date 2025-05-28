import React, { useState } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { MobileTooltip } from '@/components/ui/mobile-tooltip';
import { CopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface TxhashProps {
  hash: string;
  explorerUrl: string;
  formattedHash: string;
  className?: string;
  trigger?: 'hover' | 'click';
}

export const Txhash: React.FC<TxhashProps> = ({
  hash,
  explorerUrl,
  formattedHash,
  className,
  trigger = 'hover',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tooltipContent = (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#FFAA2E] break-all">{hash}</span>
      <div
        className={cn(
          'flex items-center justify-center bg-[#3A3740] rounded-md p-2',
          copied ? 'bg-emerald-700' : 'bg-[#3A3740]'
        )}
        onClick={handleCopy}
        style={{ cursor: 'pointer' }}
      >
        <CopyIcon color="white" />
      </div>
      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#3A3740] rounded-md hover:bg-[#23232b] text-white transition-colors p-2"
        aria-label="Open in explorer"
        onClick={(e) => e.stopPropagation()}
      >
        <ExternalLinkIcon />
      </a>
    </div>
  );

  if (trigger === 'click' && !!hash) {
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <MobileTooltip
          content={tooltipContent}
        >
          <div
            className={`text-[#FFAA2E] underline hover:opacity-80 transition-opacity ${className || ''}`}
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            {formattedHash}
          </div>
        </MobileTooltip>
      </div>
    );
  }

  return !!hash && (
    <Tooltip
      content={tooltipContent}
    >
      <div
        className={`text-[#FFAA2E] underline hover:opacity-80 transition-opacity ${className || ''}`}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        {formattedHash}
      </div>
    </Tooltip>
  );
};
