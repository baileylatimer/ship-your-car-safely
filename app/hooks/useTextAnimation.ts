import { useEffect, useRef } from "react";

export const useTextAnimation = (text: string) => {
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef.current) return;

    const initAnimation = async () => {
      const [gsap, ScrollTrigger] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      gsap.default.registerPlugin(ScrollTrigger.default);

      // Split text into words
      const words = text.split(' ');
      elementRef.current!.innerHTML = words
        .map(word => `<span class="inline-block opacity-0 translate-y-8">${word}</span>`)
        .join(' ');

      // Animate each word
      const wordElements = elementRef.current!.querySelectorAll('span');
      gsap.default.to(wordElements, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    };

    initAnimation();

    // Cleanup
    return () => {
      import("gsap/ScrollTrigger").then((ScrollTrigger) => {
        ScrollTrigger.default.getAll().forEach(trigger => trigger.kill());
      });
    };
  }, [text]);

  return elementRef;
};
