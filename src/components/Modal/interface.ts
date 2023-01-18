import React from 'react';

export interface ModalProps {
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean;
  title?: React.ReactNode;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancle?: (e: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  cancleText?: React.ReactNode;
  width?: number | string;
  closable?: boolean;
  afterClose?: () => void;
  footer?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  children?: React.ReactNode;
  closeIcon?: React.ReactNode;
  keyboard?: boolean;
  destoryOnClose?: boolean;
}

export interface IconHoverProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}
