import { Link, type LinkProps } from '@remix-run/react';

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// This is now just a simple wrapper around Link with no transition effects
export function TransitionLink({ to, children, className, onClick }: TransitionLinkProps) {
  return (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

// Simple pass-through HOC with no transition effects
export function withTransition(Component: typeof Link) {
  return function TransitionComponent(props: LinkProps) {
    return <Component {...props} />;
  };
}

// Pre-wrapped Link component (now just a regular Link)
export const TransitionWrappedLink = Link;

export default TransitionLink;
