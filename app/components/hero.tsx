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
    <div className="hero-section relative h-screen mx-3 lg:mx-10 mt-5 rounded-md border-radius-30">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center rounded-md border-radius-30"
        style={{
          backgroundImage: `url(${urlFor(backgroundImage).width(1920).url()})`,
        }}
      >
        {/* Top gradient overlay */}
        <div 
          className="absolute top-0 left-0 right-0 h-[307px]" 
          style={{
            borderRadius: '30px 30px 0px 0px',
            background: 'linear-gradient(0deg, rgba(23, 40, 61, 0.00) 0%, #17283D 100%)'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-[307px]" 
          style={{
            borderRadius: '0px 0px 30px 30px',
            background: 'linear-gradient(180deg, rgba(23, 40, 61, 0.00) 0%, #17283D 100%)'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-start px-4 sm:px-3 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-h1-mobile md:text-h1 font-medium text-[#C8D6E6] max-w-3xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
