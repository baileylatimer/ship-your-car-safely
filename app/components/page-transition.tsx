import { useEffect, useRef } from 'react';
import { useLocation, Outlet } from '@remix-run/react';
import gsap from 'gsap';

export function PageTransition() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prevPathRef = useRef(location.pathname);
  const isAnimatingRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      const pageText = location.pathname === '/' ? 'Home' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);
      
      gsap.set(containerRef.current, { display: 'block' });
      gsap.set(leftBlockRef.current, { yPercent: -100 });
      gsap.set(rightBlockRef.current, { yPercent: 100 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      if (textRef.current) textRef.current.textContent = pageText;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          prevPathRef.current = location.pathname;
        }
      });

      // First half of animation (blocks covering the screen)
      tl.to([leftBlockRef.current, rightBlockRef.current], {
        yPercent: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      })
      // Show page name
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
      // Hold for a moment
      .to({}, { duration: 0.8 })
      // Hide page name
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      })
      // Second half of animation (blocks leaving)
      .to([leftBlockRef.current, rightBlockRef.current], {
        yPercent: (i) => (i === 0 ? -100 : 100),
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(containerRef.current, { display: 'none' });
        }
      });

      return () => {
        tl.kill();
      };
    }
  }, [location]);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none hidden">
        <div ref={leftBlockRef} className="absolute top-0 left-0 w-1/2 h-full" style={{ backgroundColor: '#111E2E' }} />
        <div ref={rightBlockRef} className="absolute bottom-0 right-0 w-1/2 h-full" style={{ backgroundColor: '#111E2E' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 ref={textRef} className="text-[var(--light-blue-bg)] text-[70px] font-bold opacity-0" />
        </div>
      </div>
      <div ref={contentRef} className="relative">
        <Outlet />
      </div>
    </>
  );
}
