import { useContext } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { TransitionContext } from '../context/TransitionContext';

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({ to, children, className, onClick }: TransitionLinkProps) {
  const navigate = useNavigate();
  const { playCloseAnimation } = useContext(TransitionContext);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Call the onClick handler if provided
    onClick?.();
    
    // Play the closing animation first
    await playCloseAnimation(to);
    
    // Then navigate to the new route
    navigate(to);
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
