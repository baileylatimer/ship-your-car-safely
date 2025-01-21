import React from 'react';
import { urlFor } from '~/lib/sanity.image';

interface HeroProps {
  title: string;
  backgroundImage: {
    asset: {
      _ref: string;
    };
  };
}

export default function Hero({ title, backgroundImage }: HeroProps) {
  return (
    <div className="relative h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${urlFor(backgroundImage).width(1920).url()})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-start px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-h1-mobile md:text-h1 font-medium text-[#C8D6E6] max-w-3xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
