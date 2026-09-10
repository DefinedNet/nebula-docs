import React, { type ReactNode } from 'react';
import { RailSearchProvider } from '@components/RailSearch/RailSearchContext';

/**
 * Root wraps everything, so it is the only place whose context both the navbar
 * and the doc sidebar can read.
 */
export default function Root({ children }: { children: ReactNode }): ReactNode {
  return <RailSearchProvider>{children}</RailSearchProvider>;
}
