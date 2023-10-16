import { footerLinks } from '@/lib/static/links';
import { StaticImageData } from 'next/image';
import React from 'react';

type TailwindCSSStyles = string;

export interface ButtonProps extends React.PropsWithChildren {
  /** Tailwind CSS + DaisyUI utility string format */
  styles: TailwindCSSStyles;
}

export interface LogoProps {
  height?: number;
}

// export interface ThemeButtonProps {
//   themeChoice: string;
//   attributes: {
//     'data-set-theme': string;
//     'data-act-class': string;
//   };
// }

/** @type {children} Text content to be rendered aside the image */
export interface ImageWithTextProps extends React.PropsWithChildren {
  imageSrc: StaticImageData;
  /**
   * Tailwind CSS style string format
   *
   * Container Styles for DaisyUI Hero with figure
   * 
   * https://daisyui.com/components/hero/#hero-with-figure
   */
  styles: TailwindCSSStyles;
  /**
   * OPTIONAL - Reverses the layout
   *
   * [default = image | text]
   *
   * [reversed = text | image]
   */
  reverse?: boolean;
}

export interface FooterLinkGroupProps {
  title: string;
  links: typeof footerLinks.companyLinks
}