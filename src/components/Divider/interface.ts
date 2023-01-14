export type TextAlign = 'left' | 'center' | 'right';
export type Direction = 'horizontal' | 'vertical';

export interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  textAlign?: TextAlign;
  children?: React.ReactNode;
}
