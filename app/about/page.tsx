import React from 'react';
import Image from 'next/image';
import PageLinkCards from '@/components/layout/PageLinkCards';
import { fetchAboutContent } from '@/shopify/content/content.model';

const AboutPage: React.FC = async () => {
  const content = await fetchAboutContent();

  return (
    <main className='bg-base-100'>
      <div className='flex w-full justify-center items-center bg-accent relative'>
        <h1 className='text-6xl font-bold absolute text-white uppercase top-16 z-10'>
          {content.heroContent.title}
        </h1>
        <Image
          src={content.heroContent.image.url}
          alt={content.heroContent.image.altText}
          height={320}
          width={1920}
          className='object-cover object-center hover:brightness:100'
        />
      </div>
      <section className='py-16 px-8 bg-base-200'>
        <div className='flex flex-col-reverse xl:flex-row justify-between h-fit gap-8'>
          <PageLinkCards cards={content.cards} />
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
