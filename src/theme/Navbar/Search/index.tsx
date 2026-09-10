import Search from '@theme-original/Navbar/Search';
import type { Props } from '@theme/Navbar/Search';
import React, { type ReactNode } from 'react';
import { useRailSearch } from '@components/RailSearch/RailSearchContext';

/**
 * Suppresses the navbar's search while the sidebar rail is rendering one.
 *
 * Hiding the navbar with CSS leaves its SearchBar mounted, and every DocSearch
 * instance binds its own Cmd+K listener, so two modals opened at once. Returning
 * null keeps the child from mounting at all.
 *
 * The rail reports its own presence (see RailSearchContext) rather than this
 * inferring it: `useDocsSidebar` throws outside its provider, and the route is
 * no help either — the docs plugin owns `/docs/**`, so a 404 under that prefix
 * is indistinguishable from a real doc. Suppressing on the route would leave
 * the 404 with no search at all.
 */
export default function NavbarSearchWrapper(props: Props): ReactNode {
  const { railHasSearch } = useRailSearch();

  if (railHasSearch) {
    return null;
  }

  return <Search {...props} />;
}
