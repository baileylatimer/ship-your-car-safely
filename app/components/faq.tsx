import { useRef, useEffect, useState } from 'react'
import { urlFor } from '~/lib/sanity.image'
import type { FaqItem } from '~/types/sanity'

interface FaqProps {
  items: FaqItem[]
}

export default function Faq({ items }: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const iconRefs = useRef<(SVGSVGElement | null)[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimation = async () => {
      const [gsap, ScrollTrigger] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      gsap.default.registerPlugin(ScrollTrigger.default);

      // Initialize content and line states
      contentRefs.current.forEach((content, index) => {
        const line = lineRefs.current[index]

        if (!line || !content) return

        gsap.default.set(content, { 
          height: 0, 
          opacity: 0
        })
        gsap.default.set(line, { 
          width: '100%',
          position: 'absolute',
          bottom: 0
        })
      })

      // Initialize title animations
      titleRefs.current.forEach((title) => {
        if (!title) return;
        
        // Set initial state
        gsap.default.set(title, {
          opacity: 0,
          y: 50
        });
        
        // Animate to final state
        gsap.default.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
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

  const handleClick = async (index: number) => {
    if (typeof window === "undefined") return;
    
    const gsap = (await import("gsap")).default;
    const icon = iconRefs.current[index];

    if (activeIndex === index) {
      // Close current item
      closeItem(index)
      setActiveIndex(null)
      // Rotate icon back
      if (icon) {
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: 'power3.inOut'
        });
      }
    } else {
      // If there's an active item, close it first
      if (activeIndex !== null) {
        const prevIcon = iconRefs.current[activeIndex];
        if (prevIcon) {
          gsap.to(prevIcon, {
            rotation: 0,
            duration: 0.3,
            ease: 'power3.inOut'
          });
        }

        const tl = gsap.timeline()
        
        // Close current item
        tl.to(contentRefs.current[activeIndex], {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        })
        .to(contentRefs.current[activeIndex], {
          height: 0,
          duration: 0.3,
          ease: 'power3.inOut'
        }, '<')
        .to(lineRefs.current[activeIndex], {
          bottom: 0,
          duration: 0.3,
          ease: 'power3.inOut',
          onComplete: () => {
            // After previous item is closed, open new item
            openItem(index)
            setActiveIndex(index)
            // Rotate new icon
            if (icon) {
              gsap.to(icon, {
                rotation: 180,
                duration: 0.3,
                ease: 'power3.inOut'
              });
            }
          }
        }, '<')
      } else {
        // No active item, just open the new one
        openItem(index)
        setActiveIndex(index)
        // Rotate icon
        if (icon) {
          gsap.to(icon, {
            rotation: 180,
            duration: 0.3,
            ease: 'power3.inOut'
          });
        }
      }
    }
  }

  const openItem = async (index: number) => {
    if (typeof window === "undefined") return;
    
    const gsap = (await import("gsap")).default;
    const line = lineRefs.current[index]
    const content = contentRefs.current[index]

    if (!line || !content) return

    const tl = gsap.timeline()

    // Measure content height
    const contentHeight = content.scrollHeight
    gsap.set(content, { height: 0, opacity: 0 })

    // Create timeline with all animations
    tl.to(line, {
      bottom: -contentHeight,
      duration: 0.3,
      ease: 'power3.inOut'
    })
    .to(content, {
      height: contentHeight,
      duration: 0.3,
      ease: 'power3.out'
    }, '<')
    .to(content, {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out'
    }, '>-=0.1')
  }

  const closeItem = async (index: number) => {
    if (typeof window === "undefined") return;
    
    const gsap = (await import("gsap")).default;
    const line = lineRefs.current[index]
    const content = contentRefs.current[index]

    if (!line || !content) return

    const tl = gsap.timeline()

    // Animate content and line
    tl.to(content, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(content, {
      height: 0,
      duration: 0.3,
      ease: 'power3.inOut'
    }, '<')
    .to(line, {
      bottom: 0,
      duration: 0.3,
      ease: 'power3.inOut'
    }, '<')
  }

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="relative py-5">
          <button
            className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17283D] focus-visible:ring-opacity-50 rounded-lg"
            onClick={() => handleClick(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(index);
              }
            }}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <div className="relative">
              <div className="relative pb-8">
                <div className="flex justify-between items-center">
                  <h3 
                    ref={el => titleRefs.current[index] = el}
                    id={`faq-title-${index}`}
                    className="text-[24px] lg:text-[39px] leading-tight text-black pr-8"
                  >
                    {item.title}
                  </h3>
                  <svg
                    ref={el => iconRefs.current[index] = el}
                    className="w-8 h-8 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#17283D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
                {/* Line element */}
                <div 
                  ref={el => lineRefs.current[index] = el}
                  className="absolute left-0 right-0 bottom-0 border-b border-[#17283D]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>

          {/* Content container */}
          <div
            ref={el => contentRefs.current[index] = el}
            id={`faq-content-${index}`}
            role="region"
            aria-labelledby={`faq-title-${index}`}
            className="overflow-hidden"
          >
            <div className="pt-5 pb-5 flex md:flex-row flex-col items-start">
              <p className="text-[18px] leading-normal text-[#17283D] flex-1">{item.description}</p>
              <div className="w-full md:w-[240px] md:ml-8 mt-4 md:mt-0">
                <img 
                  src={urlFor(item.image).width(240).height(240).fit('crop').url()}
                  alt=""
                  role="presentation"
                  className="w-[240px] h-[240px] object-cover rounded-[30px]"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
