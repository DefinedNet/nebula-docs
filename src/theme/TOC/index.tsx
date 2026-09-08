import TOC from '@theme-original/TOC';
import type TOCType from '@theme/TOC';
import React, { useId, type ComponentProps, type ReactNode } from 'react';
import styles from './styles.module.css';

type Props = ComponentProps<typeof TOCType>;

/**
 * Wraps the in-page table of contents with a heading and a nav landmark.
 *
 * Upstream renders a bare list in a plain <div>, so the column arrives with no
 * label explaining what it is and no landmark for assistive tech to jump to.
 * `aria-labelledby` points the landmark at the visible heading rather than
 * duplicating the string in an aria-label.
 */
export default function TOCWrapper(props: Props): ReactNode {
  const labelId = useId();

  return (
    <nav className={styles.container} aria-labelledby={labelId}>
      <div id={labelId} className={styles.label}>
        On this page
      </div>
      <TOC {...props} />
    </nav>
  );
}
