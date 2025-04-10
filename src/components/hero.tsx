import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';

interface HeroProps {
  variant?: 'default' | 'center' | 'image';
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  topTitle?: string;
}

export function Hero({
  variant = 'default',
  title,
  description,
  imageSrc,
  imageAlt = 'Hero image',
  className,
  topTitle,
}: HeroProps) {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (textContainerRef.current && window.innerWidth >= 768) {
        setImageHeight(textContainerRef.current.clientHeight);
      } else {
        setImageHeight(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={cn(
        'w-full py-16 md:py-10 md:px-[120px]',
        'bg-transparent',
        'flex justify-center',
        className
      )}
    >
      <div className="container px-4 md:px-0 md:w-[1024px]">
        {variant === 'center' && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16">
            <div
              ref={textContainerRef}
              className="flex flex-col items-center text-center md:items-start md:text-left md:max-w-[500px]"
            >
              {topTitle && (
                <h2
                  className="text-[#939097] mb-4 uppercase text-center md:text-left"
                  style={{
                    fontFamily: 'Druk, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    lineHeight: '120%',
                    letterSpacing: '1%',
                    textTransform: 'uppercase',
                  }}
                >
                  {topTitle}
                </h2>
              )}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                {title}
              </h1>
              <p className="text-base md:text-lg text-gray-300">
                {description}
              </p>
            </div>
            {imageSrc && (
              <div
                ref={imageContainerRef}
                className="w-full md:max-w-[528px] lg:max-w-[528px] md:max-h-[281px] lg:max-h-[281px] md:flex md:items-center md:justify-center"
                style={{
                  height:
                    imageHeight && window.innerWidth >= 768
                      ? `${imageHeight}px`
                      : 'auto',
                }}
              >
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
