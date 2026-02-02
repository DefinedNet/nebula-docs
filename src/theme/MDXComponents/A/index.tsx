import type { WrapperProps } from '@docusaurus/types';
import A from '@theme-original/MDXComponents/A';
import type AType from '@theme/MDXComponents/A';
import React, { type ReactNode } from 'react';

type Props = WrapperProps<typeof AType>;

export default function AWrapper(props: Props): ReactNode {
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

  return <A rel={customRel} target={customTarget} {...props} />;
}
