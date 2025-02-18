import { useCallback, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from '@remix-run/react';
import { TransitionContext } from '../context/TransitionContext';

export function useTransitionNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playCloseAnimation } = useContext(TransitionContext);

  const handleNavigation = useCallback(async (to: string, e?: React.MouseEvent, state?: any) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      // Play the closing animation and wait for it to complete
      await playCloseAnimation(to);
      
      // Add a delay to ensure animation completes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Then navigate
      navigate(to, { state });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [navigate, playCloseAnimation]);

  // Handle all link clicks
  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const link = (e.target as Element).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Only handle internal links
      if (href.startsWith('/') || href.startsWith('#')) {
        e.preventDefault();
        await handleNavigation(href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleNavigation]);

  return handleNavigation;
}
