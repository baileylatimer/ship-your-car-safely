import { Services } from '~/types/sanity'
import { urlFor } from '~/lib/sanity.image'
import { useState, useEffect, useRef } from 'react'
import type { Settings } from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function ServicesSection({ title, description, services }: Services) {
  const [SliderComponent, setSliderComponent] = useState<any>(null);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    // Load slider on client-side only
    if (typeof window !== 'undefined') {
      import('react-slick').then((mod) => {
        setSliderComponent(() => mod.default);
      });
    }
  }, []);
  
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
    swipe: true,
    touchMove: true,
    className: "services-slider",
    beforeChange: () => {
      // Reset any revealed cards
      const revealedCards = document.querySelectorAll('[data-revealed="true"]');
      revealedCards.forEach(card => {
        card.setAttribute('data-revealed', 'false');
      });
    }
  };

  return (
    <section className="bg-[#17283D] text-[#C8D6E6] px-0 md:px-10 py-[50px] md:py-[100px]">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-[12px] [&>*]:mb-[10px]">
            {/* First row: Title/description + 2 cards */}
            <div className="col-span-2">
              <h1 className="text-6xl font-bold mb-4">{title}</h1>
              <p className="text-xl">{description}</p>
            </div>
            {services.slice(0, 2).map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}

            {/* Second row: 4 cards */}
            {services.slice(2, 6).map((service, index) => (
              <ServiceCard key={index + 2} service={service} />
            ))}

            {/* Third row: 3 cards + invisible placeholder */}
            {services.slice(6, 9).map((service, index) => (
              <ServiceCard key={index + 6} service={service} />
            ))}
            {/* Invisible placeholder card */}
            <div className="invisible" />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex  p-3 flex-col md:hidden">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg">{description}</p>
          </div>
          <div className="w-full">
            <div >
              {SliderComponent ? (
                <SliderComponent  ref={sliderRef} {...settings}>
                  {services.map((service, index) => (
                    <div key={index}>
                      <ServiceCard 
                        service={service} 
                        onReveal={() => {
                          if (sliderRef.current?.slickPause) {
                            sliderRef.current.slickPause();
                          }
                        }}
                        onHide={() => {
                          if (sliderRef.current?.slickPlay) {
                            sliderRef.current.slickPlay();
                          }
                        }}
                      />
                    </div>
                  ))}
                </SliderComponent>
              ) : (
                <div className="gap-3 flex overflow-x-auto">
                  {services.map((service, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <ServiceCard service={service} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ 
  service,
  onReveal,
  onHide
}: { 
  service: any;
  onReveal?: () => void;
  onHide?: () => void;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.setAttribute('data-revealed', isRevealed.toString());
    }

    if (isRevealed) {
      onReveal?.();
    } else {
      onHide?.();
    }
  }, [isRevealed, onReveal, onHide]);

  return (
    <div
      ref={cardRef}
      className="group h-[300px] cursor-pointer relative overflow-hidden"
      onMouseEnter={() => !isMobile && setIsRevealed(true)}
      onMouseLeave={() => !isMobile && setIsRevealed(false)}
      onClick={() => isMobile && setIsRevealed(!isRevealed)}
      data-revealed={isRevealed}
    >
      {/* Base Card (Background Layer) */}
      <div className="absolute inset-0 bg-[#17283D] rounded-[30px] rounded-tl-none border border-[#C8D6E6] z-0"></div>

      {/* Description (Middle Layer - Should be on Top when hovered) */}
      <div 
        className="absolute inset-0 px-5 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-30"
      >
        <p className="text-[#C8D6E6] text-lg">{service.description}</p>
      </div>

      {/* Front Content (Image Layer) */}
      <div className="absolute inset-0 rounded-[30px] rounded-tl-none border border-[#C8D6E6] overflow-hidden transition-opacity duration-300 group-hover:opacity-0 z-20">
        <img
          src={urlFor(service.image).url()}
          alt={service.title}
          className="w-full h-full object-cover select-none"
          draggable={false}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-2xl font-medium text-[#C8D6E6]">{service.title}</h3>
        </div>
      </div>
    </div>
  );
}
