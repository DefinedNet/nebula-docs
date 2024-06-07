import Highlight from './Highlight';

export function UnderlayIP({ children }) {
  return (
    <span
      style={{
        textDecorationColor: 'green',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationThickness: '2px',
      }}
    >
      {children}
    </span>
  );
}
