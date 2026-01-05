import React from 'react';
import styles from './Pill.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: 'info' | 'warning';
};

export function Pill({ children, className, variant = 'info' }) {
  const variantClass = styles[`Pill___${variant}`];

  return <span className={`${styles.Pill} ${variantClass} ${className}`.trim()}>{children}</span>;
}
