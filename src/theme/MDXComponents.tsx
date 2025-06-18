// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import React from 'react';
import Highlight from '@src/components/Highlight';
import { OverlayIP } from '@src/components/OverlayIP';
import { UnderlayIP } from '@src/components/UnderlayIP';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Highlight,
  OverlayIP,
  UnderlayIP,
};
