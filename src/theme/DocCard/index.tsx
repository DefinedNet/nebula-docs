import Link from '@docusaurus/Link';
import { findFirstSidebarItemLink, useDocById } from '@docusaurus/plugin-content-docs/client';
import { usePluralForm } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/DocCard';
import Heading from '@theme/Heading';
import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Replaces theme-classic's card with a flatter, tighter one.
 *
 * Ejected rather than wrapped because the upstream card renders its icon as a
 * text node inside the heading (`{icon} {title}`), which no wrapper or CSS can
 * remove.
 *
 * Titles come from the doc itself, not the sidebar item's label: the guides
 * shorten those via `sidebar_label` to keep the nav rail to one line, and the
 * full title is the more useful thing to read when browsing.
 */

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        { count },
      ),
    );
}

function CardRow({ href, title, description }: { href: string; title: string; description?: string }): ReactNode {
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.header}>
        <Heading as="h2" className={styles.title}>
          {title}
        </Heading>
        <span className={styles.chevron} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      {description && <span className={styles.description}>{description}</span>}
    </Link>
  );
}

export default function DocCard({ item }: Props): ReactNode {
  const doc = useDocById(item.type === 'link' ? (item.docId ?? undefined) : undefined);
  const categoryItemsPlural = useCategoryItemsPlural();

  if (item.type === 'link') {
    return (
      <CardRow href={item.href} title={doc?.title ?? item.label} description={item.description ?? doc?.description} />
    );
  }

  if (item.type === 'category') {
    const href = findFirstSidebarItemLink(item);
    // Categories without a link are filtered out upstream before reaching here
    if (!href) {
      return null;
    }
    return (
      <CardRow
        href={href}
        title={item.label}
        description={item.description ?? categoryItemsPlural(item.items.length)}
      />
    );
  }

  throw new Error(`unknown item type ${JSON.stringify(item)}`);
}
