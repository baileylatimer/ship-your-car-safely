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

    if (activeIndex === index) {
      // Close current item
      closeItem(index)
      setActiveIndex(null)
    } else {
      // If there's an active item, close it first
      if (activeIndex !== null) {
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
          }
        }, '<')
      } else {
        // No active item, just open the new one
        openItem(index)
        setActiveIndex(index)
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
        <div 
          key={index}
          className="relative py-5 cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <div className="relative">
            <div className="relative pb-8">
              <h3 
                ref={el => titleRefs.current[index] = el}
                className="text-[39px] leading-tight text-black"
              >
                {item.title}
              </h3>
              
              {/* Line element */}
              <div 
                ref={el => lineRefs.current[index] = el}
                className="absolute left-0 right-0 bottom-0 border-b border-[#17283D]"
              />
            </div>

            {/* Content container */}
            <div
              ref={el => contentRefs.current[index] = el}
              className="overflow-hidden"
            >
              <div className="pt-5 pb-5 flex md:flex-row flex-col items-start">
                <p className="text-[18px] leading-normal text-[#17283D] flex-1">{item.description}</p>
                <div className="w-full md:w-[240px] md:ml-8 mt-4 md:mt-0">
                  <img 
                    src={urlFor(item.image).width(240).height(240).fit('crop').url()}
                    alt={item.title}
                    className="w-[240px] h-[240px] object-cover rounded-[30px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
