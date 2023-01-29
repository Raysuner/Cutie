import { ReactNode, CSSProperties } from 'react';

export type TextAlign = 'left' | 'center' | 'right';
export type Direction = 'horizontal' | 'vertical';

export interface DividerProps {
  className?: string;
  style?: CSSProperties;
  direction?: Direction;
  textAlign?: TextAlign;
  children?: ReactNode;
}
