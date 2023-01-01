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
export type ButtonHtmlType = 'text' | 'submit' | 'reset';

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

export type NativeButtonProps = {
  htmlType?: ButtonHtmlType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<NativeButtonProps>;

const prefixClassName = 'tq-btn';

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const {
    type = 'default',
    shape = 'default',
    size = 'medium',
    disabled = false,
    loading = false,
    block = false,
    children,
    className,
    icon
  } = props;
  const [loadingState, setLoadingState] = useState<boolean | number>(
    loading === true
  );

  const iconType = loadingState ? 'loading' : icon;
  const classString = classNames(className, prefixClassName, {
    [`${prefixClassName}-${shape}`]: shape !== 'default' && shape,
    [`${prefixClassName}-${type}`]: type,
    [`${prefixClassName}-${size}`]: size,
    [`${prefixClassName}-block`]: block,
    [`${prefixClassName}-disabled`]: disabled,
    [`${prefixClassName}-only-icon`]: !children && children !== 0 && !!iconType
  });

  let iconNode = null;
  if (icon && !loadingState) {
    iconNode = icon;
  } else if (loadingState) {
    iconNode = 'loading...';
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loadingState) {
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
        setLoadingState(loadingOrDelayTime);
      }, loadingOrDelayTime);
    } else {
      setLoadingState(loadingOrDelayTime);
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

const Button = React.forwardRef<unknown, BaseButtonProps>(InternalButton);
Button.displayName = 'Button';

export default Button;
