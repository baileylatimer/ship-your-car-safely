import { useLocation, useNavigate } from '@remix-run/react';

export function useQuoteNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    if (location.pathname === '/') {
      // If we're on home page, smooth scroll to hero
      const heroElement = document.querySelector('#hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home and then scroll to hero
      navigate('/', { 
        state: { scrollToHero: true }
      });
    }
  };

  return handleQuoteClick;
}
