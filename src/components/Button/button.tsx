import React from 'react';
import classNames from 'classnames';
import LoadingIcon from './LoadingIcon';
import './button.less';

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

export interface BaseButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  block?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHtmlType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const prefixClassName = 'tq-btn';

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const {
    className,
    icon,
    children,
    type = 'default',
    shape = 'default',
    size = 'medium',
    disabled = false,
    loading = false,
    block = false,
    htmlType = 'button' as ButtonProps['htmlType'],
    ...restProps
  } = props;

  const iconNode = loading ? <LoadingIcon /> : icon;
  const classString = classNames(className, prefixClassName, {
    [`${prefixClassName}-${shape}`]: shape !== 'default' && shape,
    [`${prefixClassName}-${type}`]: type,
    [`${prefixClassName}-${size}`]: size,
    [`${prefixClassName}-block`]: block,
    [`${prefixClassName}-disabled`]: disabled,
    [`${prefixClassName}-only-icon`]: !children && children !== 0 && !!iconNode
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    props?.onClick?.(e);
  };

  return (
    <button
      {...restProps}
      type={htmlType}
      className={classString}
      disabled={disabled}
      onClick={handleClick}
      ref={ref as any}
    >
      {iconNode}
      {children}
    </button>
  );
};

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton);
Button.displayName = 'Button';

export default Button;
