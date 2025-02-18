import { Link, type LinkProps } from '@remix-run/react';
import { useTransitionNavigation } from '../hooks/useTransitionNavigation';

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({ to, children, className, onClick }: TransitionLinkProps) {
  const handleNavigation = useTransitionNavigation();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    await handleNavigation(to, e);
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

// Higher-order component to add transition to any Link
export function withTransition(Component: typeof Link) {
  return function TransitionComponent({ to, ...props }: LinkProps) {
    const handleNavigation = useTransitionNavigation();

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
      props.onClick?.(e);
      await handleNavigation(to.toString(), e);
    };

    return <Component to={to} {...props} onClick={handleClick} />;
  };
}

// Pre-wrapped Link component
export const TransitionWrappedLink = withTransition(Link);

export default TransitionLink;
