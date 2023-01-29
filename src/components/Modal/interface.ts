import React, { CSSProperties, ReactNode, MouseEvent } from 'react';

export interface ModalProps {
  className?: string;
  style?: CSSProperties;
  visible?: boolean;
  title?: ReactNode;
  onOk?: (e?: MouseEvent<HTMLElement>) => void;
  onCancle?: (e?: MouseEvent<HTMLElement> | KeyboardEvent) => void;
  okText?: ReactNode;
  cancleText?: ReactNode;
  width?: number | string;
  closable?: boolean;
  afterClose?: () => void;
  footer?: ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  children?: ReactNode;
  closeIcon?: ReactNode;
  keyboard?: boolean;
  destoryOnClose?: boolean;
  container?: Element | DocumentFragment;
}

export interface IconHoverProps {
  className?: string;
  style?: CSSProperties;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}

export interface MethodModalProps extends ModalProps {
  icon?: ReactNode;
  content?: ReactNode;
  noticeType?: 'info' | 'success' | 'warning' | 'error';
}
