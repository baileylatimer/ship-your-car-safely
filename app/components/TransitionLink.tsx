import { Link, type LinkProps } from '@remix-run/react';

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// This component now just wraps the standard Link component
// The "Transition" name is kept for backward compatibility
export function TransitionLink({ to, children, className, onClick }: TransitionLinkProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

// These are kept for backward compatibility but now just pass through to regular Link
export function withTransition(Component: typeof Link) {
  return function TransitionComponent(props: LinkProps) {
    return <Component {...props} />;
  };
}

// Pre-wrapped Link component
export const TransitionWrappedLink = Link;

export default TransitionLink;
