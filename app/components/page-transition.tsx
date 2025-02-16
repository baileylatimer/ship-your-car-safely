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

      // Update the shared timeline
      timeline.clear();

      // Move the blocks away
      timeline
        .to('.transition-block', {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            isAnimatingRef.current = false;
            prevPathRef.current = location.pathname;
          }
        });

      timeline.play();
    }
  }, [location, timeline]);

  return (
    <div ref={contentRef} className="relative">
      {children}
    </div>
  );
}
