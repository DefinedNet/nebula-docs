import Highlight from './Highlight';

export function OverlayIP({ children }) {
  return (
    <span
      style={{
        textDecorationColor: 'purple',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationThickness: '2px',
      }}
    >
      {children}
    </span>
  );
}
