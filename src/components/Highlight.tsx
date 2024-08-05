import React from 'react';

type Props = {
  children: React.ReactNode;
  color: string;
};

export default function Highlight({ children, color }: Props) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}
    >
      {children}
    </span>
  );
}
