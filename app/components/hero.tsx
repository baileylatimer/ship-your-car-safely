import { urlFor } from '~/lib/sanity.image';
import QuoteForm from './quote-form';

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
    <div id="hero" className="hero-section relative h-screen max-h-[98vh] lg:max-h-[900px] mx-3 lg:mx-10 mt-2 rounded-md border-radius-30">
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
      <div className="relative h-full flex flex-col lg:flex-row items-end justify-between px-4 sm:px-3 lg:px-8 pb-8 lg:pb-24 pt-20 lg:pt-0  mx-auto">
        <div className="flex flex-col gap-8 lg:max-w-[50%]">
          <h1 className="text-h1-mobile md:text-h1 font-medium text-[#C8D6E6]">
            {title}
          </h1>
        </div>
        <div className="w-full lg:w-auto mt-8 lg:mt-0">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
