import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
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
  loading?: boolean | { delay?: number };
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
  const [isLoading, setIsLoading] = useState<boolean | number>(
    loading === true
  );

  const iconType = isLoading ? 'loading' : icon;
  const classString = classNames(className, prefixClassName, {
    [`${prefixClassName}-${shape}`]: shape !== 'default' && shape,
    [`${prefixClassName}-${type}`]: type,
    [`${prefixClassName}-${size}`]: size,
    [`${prefixClassName}-block`]: block,
    [`${prefixClassName}-disabled`]: disabled,
    [`${prefixClassName}-only-icon`]: !children && children !== 0 && !!iconType
  });

  let iconNode = null;
  if (icon && !isLoading) {
    iconNode = icon;
  } else if (isLoading) {
    iconNode = 'loading...';
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    props?.onClick?.(e);
  };

  const loadingOrDelayTime: number | boolean =
    typeof loading === 'object' ? loading.delay || true : loading;

  useEffect(() => {
    let timer: number | null = null;
    if (typeof loadingOrDelayTime === 'number') {
      timer = setTimeout(() => {
        setIsLoading(true);
      }, loadingOrDelayTime);
    } else {
      setIsLoading(loadingOrDelayTime);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [loadingOrDelayTime]);

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
