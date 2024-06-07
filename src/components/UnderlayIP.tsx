import Highlight from './Highlight';

export function UnderlayIP({ children }) {
  return (
    <span
      style={{
        textDecorationColor: 'green',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        textDecorationThickness: '2px',
      }}
    >
      {children}
    </span>
  );
}
