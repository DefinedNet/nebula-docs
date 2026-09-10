import Link from '@docusaurus/Link';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import type { Props } from '@theme/DocSidebar/Desktop';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import Logo from '@theme/Logo';
import SearchBar from '@theme/SearchBar';
import clsx from 'clsx';
import React, { useEffect, type ReactNode } from 'react';
import { useRailSearch } from '@components/RailSearch/RailSearchContext';
import styles from './styles.module.css';

/**
 * Swizzled to move the site's chrome — logo, search and the color mode toggle —
 * out of the top bar and into the sidebar, so the docs read as a single
 * left-hand rail with no header above the content.
 *
 * This component only renders at >=997px (see @theme/DocSidebar, which switches
 * to DocSidebar/Mobile below that). The top bar is hidden at the same
 * breakpoint in components.css, so on mobile the navbar still supplies the
 * hamburger drawer, search and toggle exactly as before.
 */

/**
 * The configured navbar links, rendered in the sidebar footer so they survive
 * the top bar's removal. Only plain link items are supported — a dropdown or
 * any other item type would need its own rendering, and this site has none.
 */
function SidebarNavbarItems(): ReactNode {
  const { navbar } = useThemeConfig();

  const links = navbar.items.flatMap((item) => {
    const { label, href, to, ...rest } = item as { label?: string; href?: string; to?: string };
    if (!label || (!href && !to)) {
      return [];
    }
    return [
      <Link key={label} className={styles.footerLink} {...(href ? { href } : { to })} {...rest}>
        {label}
      </Link>,
    ];
  });

  return links.length > 0 ? <div className={styles.footerLinks}>{links}</div> : null;
}

function SidebarColorModeToggle(): ReactNode {
  const {
    colorMode: { disableSwitch, respectPrefersColorScheme },
  } = useThemeConfig();
  const { colorModeChoice, setColorMode } = useColorMode();

  if (disableSwitch) {
    return null;
  }

  return (
    <ColorModeToggle
      className={styles.colorModeToggle}
      respectPrefersColorScheme={respectPrefersColorScheme}
      value={colorModeChoice}
      onChange={setColorMode}
    />
  );
}

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props): ReactNode {
  const {
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  // Tell the navbar to drop its own search while this rail is mounted, so only
  // one DocSearch exists and Cmd+K opens a single modal.
  const { setRailHasSearch } = useRailSearch();
  useEffect(() => {
    setRailHasSearch(true);
    return () => setRailHasSearch(false);
  }, [setRailHasSearch]);

  return (
    <div className={clsx(styles.sidebar, isHidden && styles.sidebarHidden)}>
      <div className={styles.header}>
        <Logo className={styles.brand} imageClassName={styles.brandImage} titleClassName={styles.brandTitle} />
        <div className={styles.search}>
          <SearchBar />
        </div>
      </div>

      <Content path={path} sidebar={sidebar} />

      <div className={styles.footer}>
        <SidebarNavbarItems />
        <SidebarColorModeToggle />
      </div>

      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
