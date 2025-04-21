import React from 'react';
import { Link } from '@remix-run/react';

// Create a context to hold our Link component (now just the regular Link)
export const LinkContext = React.createContext<typeof Link>(Link);

// This provider is now simplified since we're not using transitions
export function TransitionLinkProvider({ children }: { children: React.ReactNode }) {
  return (
    <LinkContext.Provider value={Link}>
      {children}
    </LinkContext.Provider>
  );
}

// Hook to use the Link component
export function useTransitionLink() {
  return React.useContext(LinkContext);
}
