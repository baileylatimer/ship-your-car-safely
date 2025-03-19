import { useLocation, useNavigate } from '@remix-run/react';

export function useQuoteNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    if (location.pathname === '/') {
      // If we're on home page, smooth scroll to hero
      // Add a delay to ensure component is mounted and transitions are complete
      setTimeout(() => {
        const heroElement = document.querySelector('#hero');
        const navbarElement = document.querySelector('nav');
        
        if (heroElement) {
          const navHeight = navbarElement?.offsetHeight || 0;
          const heroPosition = heroElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: heroPosition,
            behavior: 'smooth'
          });
        } else {
          console.error('Hero element not found');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300);
    } else {
      // If we're on another page, navigate to home
      navigate('/', { state: { scrollToHero: true } });
    }
  };

  return handleQuoteClick;
}
