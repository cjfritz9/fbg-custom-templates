'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { PageLinkCardProps } from '@/@types/props';

const PageLinkCard: React.FC<PageLinkCardProps> = ({ title, image, slug }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={slug} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className='flex justify-center w-full sm:w-[560px] h-64 text-base-100 brightness-90 hover:brightness-100 [text-shadow:_0px_2px_4px_black] relative bg-accent overflow-clip'>
        <h3 className='absolute uppercase text-4xl top-4 font-semibold z-10'>{title}</h3>
        <Image
          src={image.url}
          alt={image.altText}
          height={256}
          width={560}
          className={`object-cover object-center ${isHovered ? 'scale-125' : 'scale-100'} transition-all duration-500`}
        />
      </div>
    </Link>
  );
};

export default PageLinkCard;