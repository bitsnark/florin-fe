import * as React from 'react';
import { cn } from '@/lib/utils';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The SVG path content
   */
  path: string;
  /**
   * Optional additional class names
   */
  className?: string;
  /**
   * Color to use for stroke. Default is "currentColor"
   */
  stroke?: string;
  /**
   * Fill color. Default is "none"
   */
  fill?: string;
  /**
   * Stroke width. Default is 2
   */
  strokeWidth?: number;
  /**
   * Width of the icon. Default is 24
   */
  width?: number | string;
  /**
   * Height of the icon. Default is 24
   */
  height?: number | string;
}

/**
 * Icon component for displaying SVG icons
 */
export function Icon({
  path,
  className,
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        d={path}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
