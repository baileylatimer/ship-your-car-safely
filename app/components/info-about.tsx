import { useState, useRef, useEffect } from 'react'

interface InfoItem {
  title: string
  description: string
}

interface InfoAboutProps {
  items: InfoItem[]
}

export default function InfoAbout({ items }: InfoAboutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimation = async () => {
      const [gsap, ScrollTrigger] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      gsap.default.registerPlugin(ScrollTrigger.default);

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

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div 
          key={index}
          className="relative border-b border-[#17283D] py-8"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex flex-col md:flex-row items-start justify-between overflow-hidden">
            <h3 
              ref={el => titleRefs.current[index] = el}
              className="text-[39px] leading-tight text-black mb-4 md:mb-0"
            >
              {item.title}
            </h3>
            <div 
              className="w-full md:ml-16 md:flex-1 md:max-w-[45%]"
              style={{
                maxHeight: hoveredIndex === index ? '1000px' : '0',
                opacity: hoveredIndex === index ? 1 : 0,
                transition: `
                  max-height 0.5s cubic-bezier(0.33, 1, 0.68, 1),
                  opacity 0.3s ease-in-out
                `
              }}
            >
              <p className="text-[18px] leading-normal text-[#17283D]">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
