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

      // Move the blocks away
      timeline
        .to('.transition-block', {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 0.6,
          ease: 'power2.inOut'
        })
        // Fade out text slightly before blocks finish
        .to('.page-transition-text', {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        }, "-=0.7") // Start 0.1s before blocks finish
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
