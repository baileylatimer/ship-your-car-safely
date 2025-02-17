import { useEffect, useRef, useContext } from 'react';
import { useLocation } from '@remix-run/react';
import gsap from 'gsap';
import { TransitionContext } from '../context/TransitionContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const isAnimatingRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { timeline } = useContext(TransitionContext);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current && !isAnimatingRef.current && timeline) {
      isAnimatingRef.current = true;

      // Scroll to top
      window.scrollTo(0, 0);

      // Update the shared timeline
      timeline.clear();

      // Move the blocks away with matching duration
      timeline
        .to('.transition-block', {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 0.6,
          ease: 'power2.inOut',
        })
        // Fade out text with matching duration
        .to('.page-transition-text', {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        }, "-=0.7") // Start earlier to match the enter animation timing
        // Add a matching pause at the end
        
        .eventCallback('onComplete', () => {
          isAnimatingRef.current = false;
          prevPathRef.current = location.pathname;
        });

      timeline.play();

      // Cleanup function
      return () => {
        if (timeline) {
          timeline.kill();
        }
      };
    }
  }, [location, timeline]);

  return (
    <div ref={contentRef} className="relative">
      {children}
    </div>
  );
}
