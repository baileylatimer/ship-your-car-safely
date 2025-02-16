import { createContext, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface TransitionContextType {
  timeline: gsap.core.Timeline | null;
  playCloseAnimation: (nextPath: string) => Promise<void>;
}

// Create the context with a default value
export const TransitionContext = createContext<TransitionContextType>({
  timeline: null,
  playCloseAnimation: async () => {},
});

// Provider component
export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create timeline after component mounts
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: 'power1.inOut' }
    });

    setTimeline(tl);
  }, []);

  const textRef = useRef<HTMLHeadingElement>(null);

  const playCloseAnimation = async (nextPath: string) => {
    if (!timeline) return;

    return new Promise<void>((resolve) => {
      // Reset any existing animations
      timeline.clear();
      
      // Set initial state
      gsap.set(containerRef.current, { display: 'block' });
      gsap.set(leftBlockRef.current, { yPercent: -100 });
      gsap.set(rightBlockRef.current, { yPercent: 100 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      // Set the text content for the next page
      if (textRef.current) {
        const pageText = nextPath === '/' ? 'Home' : nextPath.slice(1).charAt(0).toUpperCase() + nextPath.slice(2);
        textRef.current.textContent = pageText;
      }

      // Create the closing animation
      timeline
        // First bring in the blocks
        .to([leftBlockRef.current, rightBlockRef.current], {
          yPercent: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        })
        // Near the end, show the text
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        }, "-=0.2") // Start slightly before the blocks finish
        .to({}, { duration: 0.2 }); // Hold for a moment

      // Play the animation and ensure it completes
      timeline.eventCallback('onComplete', () => {
        setTimeout(resolve, 100); // Small buffer after animation
      });

      timeline.play();
    });
  };

  return (
    <TransitionContext.Provider value={{ timeline, playCloseAnimation }}>
      <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none hidden">
        <div ref={leftBlockRef} className="absolute top-0 left-0 w-1/2 h-full transition-block" style={{ backgroundColor: '#111E2E' }} />
        <div ref={rightBlockRef} className="absolute bottom-0 right-0 w-1/2 h-full transition-block" style={{ backgroundColor: '#111E2E' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 ref={textRef} className="text-[var(--light-blue-bg)] text-[70px] font-bold opacity-0 page-transition-text" />
        </div>
      </div>
      {children}
    </TransitionContext.Provider>
  );
};
