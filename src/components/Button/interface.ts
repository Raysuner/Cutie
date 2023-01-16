import React from 'react';

export type ButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'dashed'
  | 'link'
  | 'text';

export type ButtonShape = 'default' | 'round' | 'circle';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonHtmlType = 'button' | 'submit' | 'reset';

interface BaseButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  block?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  anchorProps?: React.HTMLProps<HTMLAnchorElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHtmlType;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
