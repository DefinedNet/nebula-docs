import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type RailSearchContextValue = {
  /** True while the desktop sidebar rail is rendering its own search. */
  railHasSearch: boolean;
  setRailHasSearch: (value: boolean) => void;
};

const RailSearchContext = createContext<RailSearchContextValue | null>(null);

/**
 * Lets the sidebar rail tell the navbar that it owns the search box.
 *
 * The two live in separate React subtrees — the navbar renders outside
 * `DocsSidebarProvider`, so `useDocsSidebar` throws there — and the route alone
 * cannot answer the question, because the docs plugin owns `/docs/**`
 * including paths that 404. This carries the fact from the one place that
 * knows it to the one place that needs it.
 */
export function RailSearchProvider({ children }: { children: ReactNode }): ReactNode {
  const [railHasSearch, setRailHasSearch] = useState(false);
  const value = useMemo(() => ({ railHasSearch, setRailHasSearch }), [railHasSearch]);

  return <RailSearchContext.Provider value={value}>{children}</RailSearchContext.Provider>;
}

export function useRailSearch(): RailSearchContextValue {
  return useContext(RailSearchContext) ?? { railHasSearch: false, setRailHasSearch: () => {} };
}
