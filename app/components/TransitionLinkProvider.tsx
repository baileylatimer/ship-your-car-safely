import React from 'react';
import { Link } from '@remix-run/react';
import { TransitionWrappedLink } from './TransitionLink';

// Create a context to hold our wrapped Link component
export const LinkContext = React.createContext<typeof Link>(Link);

export function TransitionLinkProvider({ children }: { children: React.ReactNode }) {
  return (
    <LinkContext.Provider value={TransitionWrappedLink}>
      {children}
    </LinkContext.Provider>
  );
}

// Hook to use the wrapped Link component
export function useTransitionLink() {
  return React.useContext(LinkContext);
}
