import { useLocation } from '@remix-run/react';
import { useTransitionNavigation } from './useTransitionNavigation';

export function useQuoteNavigation() {
  const location = useLocation();
  const handleTransitionNavigation = useTransitionNavigation();

  const handleQuoteClick = async () => {
    if (location.pathname === '/') {
      // If we're on home page, smooth scroll to hero
      const heroElement = document.querySelector('#hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, use transition navigation to home
      await handleTransitionNavigation('/');
    }
  };

  return handleQuoteClick;
}
