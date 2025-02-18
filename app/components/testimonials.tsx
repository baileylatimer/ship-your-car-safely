import type { Testimonials } from "~/types/sanity";
import { useEffect, useState, useRef } from "react";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TestimonialsProps {
  testimonials: Testimonials;
}

import { urlFor } from "~/lib/sanity.image";

// Default testimonials data for testing
const defaultTestimonials = {
  sectionTitle: "What people are saying",
  testimonialsList: [
    {
      testimonialText: "Lorem ipsum dolor sit amet consectetur. Sit congue id adipiscing quis lorem non facilisis. Tristique ornare purus euismod bibendum bibendum proin amet.",
      author: "Richard S",
      image: {
        _type: "image" as const,
        asset: {
          _ref: 'default-image-ref',
          _type: "reference" as const
        }
      }
    },
    {
      testimonialText: "Lorem ipsum dolor sit amet consectetur. Sit congue id adipiscing quis lorem non facilisis. Tristique ornare purus euismod bibendum bibendum proin amet.",
      author: "John D",
      image: {
        _type: "image" as const,
        asset: {
          _ref: 'default-image-ref',
          _type: "reference" as const
        }
      }
    },
    {
      testimonialText: "Lorem ipsum dolor sit amet consectetur. Sit congue id adipiscing quis lorem non facilisis. Tristique ornare purus euismod bibendum bibendum proin amet.",
      author: "Sarah M",
      image: {
        _type: "image" as const,
        asset: {
          _ref: 'default-image-ref',
          _type: "reference" as const
        }
      }
    }
  ]
};

export default function TestimonialsSection({ testimonials = defaultTestimonials }: TestimonialsProps) {
  const [SliderComponent, setSliderComponent] = useState<any>(null);
  const sliderRef = useRef<any>(null);

  console.log('Testimonials data:', testimonials);
  console.log('Rendering TestimonialsSection');

  useEffect(() => {
    console.log('Loading slider component');
    // Load slider on client-side only
    if (typeof window !== 'undefined') {
      import('react-slick').then((mod) => {
        setSliderComponent(() => mod.default);
      });
    }
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 0.33,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '40%',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '15%'
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20%'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '15%'
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10%'
        }
      }
    ]
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section className="py-16 relative overflow-visible">
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-[150px] bg-gradient-to-r from-[#C8D6E6] to-transparent z-10"></div>
      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-[150px] bg-gradient-to-l from-[#C8D6E6] to-transparent z-10"></div>
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#17283D] rounded-full flex items-center justify-center text-[#C8D6E6]"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-[225deg]">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#17283D] rounded-full flex items-center justify-center text-[#C8D6E6]"
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-45">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div> {/* No constraints */}
  <h2 className="text-4xl md:text-5xl font-medium mb-12 text-center z-11 text-[#17283D]">
    {testimonials.sectionTitle}
  </h2>

  {SliderComponent ? (
    <SliderComponent ref={sliderRef} {...settings}>
      {testimonials.testimonialsList.map((testimonial, index) => (
        <div key={index} className="px-2">
          <div className="bg-light-blue-bg border border-[#17283D] rounded-2xl p-8 h-full sm:min-h-[450px] min-h-[375px] flex flex-col">
            {testimonial.image && (
              <img
                src={urlFor(testimonial.image).url()}
                alt={`${testimonial.author}'s profile`}
                className="mb-6 max-w-8"
              />
            )}
            <blockquote className="text-[18px] md:text-[39px] leading-tight mb-8 flex-grow text-[#17283D]">
              {testimonial.testimonialText}
            </blockquote>
            <p className="text-[#17283D] text-lg">
              {testimonial.author}
            </p>
          </div>
        </div>
      ))}
    </SliderComponent>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-auto"> 
      {testimonials.testimonialsList.map((testimonial, index) => (
        <div key={index} className="bg-light-blue-bg border border-[#17283D] rounded-2xl p-8 h-full min-h-[400px] flex flex-col">
          {testimonial.image && (
            <img
              src={urlFor(testimonial.image).url()}
              alt={`${testimonial.author}'s profile`}
              className="mb-6 max-w-8"
            />
          )}
          <blockquote className="text-[18px] md:text-[39px] leading-tight mb-8 flex-grow text-[#17283D]">
            {testimonial.testimonialText}
          </blockquote>
          <p className="text-[#17283D] text-lg">
            {testimonial.author}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
    </section>
  );
}
