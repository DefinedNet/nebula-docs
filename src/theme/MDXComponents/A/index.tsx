import Link from '@docusaurus/Link';
import { useAnchorTargetClassName } from '@docusaurus/theme-common';
import type { Props } from '@theme/MDXComponents/A';
import clsx from 'clsx';
import React, { type ReactNode } from 'react';

export default function MDXA(props: Props): ReactNode {
  // MDX Footnotes have ids such as <a id="user-content-fn-1-953011" ...>
  const anchorTargetClassName = useAnchorTargetClassName(props.id);

  // Customize rel attribute for *.defined.net links
  let customRel = props.rel;
  let customTarget = props.target;
  if (props.href && typeof props.href === 'string') {
    try {
      const url = new URL(props.href, window.location.href);
      // Check if it's an external link to *.defined.net
      if (url.hostname.endsWith('.defined.net') || url.hostname === 'defined.net') {
        // Override to only use 'noopener' (exclude 'noreferrer')
        customRel = 'noopener';
        customTarget = '_blank';
      }
    } catch {
      // Invalid URL, let default behavior handle it
    }
  }

  return (
    <Link {...props} rel={customRel} target={customTarget} className={clsx(anchorTargetClassName, props.className)} />
  );
}
