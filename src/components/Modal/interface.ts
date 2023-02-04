import React, {
  CSSProperties,
  ReactNode,
  MouseEvent,
  ForwardRefExoticComponent,
  ReactElement
} from 'react';

export interface ModalProps {
  className?: string;
  style?: CSSProperties;
  visible?: boolean;
  title?: ReactNode;
  onOk?: (e?: MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: MouseEvent<HTMLElement> | KeyboardEvent) => void;
  okText?: ReactNode;
  cancelText?: ReactNode;
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
  container?: Element;
  hideCancel?: boolean;
}

export interface IconHoverProps {
  className?: string;
  style?: CSSProperties;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}

export interface MethodModalConfig extends ModalProps {
  icon?: ReactNode;
  content?: ReactNode;
  isNotice?: boolean;
  noticeType?: 'info' | 'success' | 'warning' | 'error';
}

export interface MethodModalReturnType {
  close: () => void;
  update: (config: MethodModalConfig) => void;
}

type ModalMethodType = (config: MethodModalConfig) => MethodModalReturnType;

export interface MethodType {
  show: ModalMethodType;
  info: ModalMethodType;
  success: ModalMethodType;
  warning: ModalMethodType;
  error: ModalMethodType;
}
export interface MethodModal
  extends ForwardRefExoticComponent<ModalProps>,
    MethodType {
  destoryAll: () => void;
  useModal: () => [MethodType, ReactElement];
}
