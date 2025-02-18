import { useLoaderData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { urlFor } from '~/lib/sanity.image'
import type { LoaderData, ProcessCard } from '~/types/sanity'

export default function Process() {
  const { process } = useLoaderData<LoaderData>()
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimation = async () => {
      const [gsap, ScrollTrigger] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      gsap.default.registerPlugin(ScrollTrigger.default);

      cardRefs.current.forEach((card) => {
        if (!card) return;
        
        gsap.default.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });
    };

    initAnimation();

    return () => {
      import("gsap/ScrollTrigger").then((ScrollTrigger) => {
        ScrollTrigger.default.getAll().forEach(trigger => trigger.kill());
      });
    };
  }, []);

  if (!process?.processCards?.length) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-5 pb-20 sm:py-10 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {process.processCards.map((card: ProcessCard, index: number) => (
          <div
            key={card.title}
            ref={el => cardRefs.current[index] = el}
            className={`p-8 rounded-[30px] border border-[#17283D] opacity-0 translate-y-8 ${
              index === 0
                ? 'bg-[#17283D] text-[#C8D6E6]'
                : 'bg-light-blue-bg text-[#17283D]'
            }`}
          >
            {card.icon && (
              <img
                src={urlFor(card.icon).width(64).height(64).url()}
                alt=""
                className="w-16 h-16 mb-6"
              />
            )}
            <h3 className="text-h3-mobile md:text-h3 font-medium mb-4">{card.title}</h3>
            <hr className={`my-4 ${index === 0 ? 'border-[#C8D6E6]' : 'border-[#17283D]/20'}`} />
            <p className="text-base-p font-book">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
