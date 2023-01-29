import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Children,
  ReactNode,
  MouseEvent,
  ForwardedRef
} from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import './Button.less';
import { ButtonProps } from './interface';

const prefixClassName = 'cutie-btn';

function processChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    return typeof child === 'string' ? <span>{child}</span> : child;
  });
}

const InternalButton: ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const {
    className,
    icon,
    type = 'default',
    shape = 'default',
    size = 'medium',
    disabled = false,
    loading = false,
    block = false,
    href,
    anchorProps,
    htmlType = 'button' as ButtonProps['htmlType'],
    children,
    ...restProps
  } = props;

  const classString = classNames(className, prefixClassName, {
    [`${prefixClassName}-${shape}`]: shape !== 'default' && shape,
    [`${prefixClassName}-${type}`]: type,
    [`${prefixClassName}-${size}`]: size,
    [`${prefixClassName}-link`]: href,
    [`${prefixClassName}-loading`]: loading,
    [`${prefixClassName}-block`]: block,
    [`${prefixClassName}-disabled`]: disabled
  });

  const iconNode = loading ? (
    <Icon className="loading-icon" type="AiOutlineLoading" />
  ) : (
    icon
  );

  const finanChildren = (
    <>
      {iconNode}
      {processChildren(children)}
    </>
  );

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    props?.onClick?.(e);
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    props?.onClick?.(e);
  };

  if (href) {
    const newAnchorProps = { ...anchorProps };
    if (disabled) {
      delete newAnchorProps.href;
    } else {
      newAnchorProps.href = href;
    }

    return (
      <a
        {...restProps}
        {...anchorProps}
        className={classString}
        onClick={handleAnchorClick}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      >
        {finanChildren}
      </a>
    );
  }

  return (
    <button
      {...restProps}
      type={htmlType}
      className={classString}
      disabled={disabled}
      onClick={handleButtonClick}
      ref={ref as ForwardedRef<HTMLButtonElement>}
    >
      {finanChildren}
    </button>
  );
};

const Button = forwardRef<unknown, ButtonProps>(InternalButton);
Button.displayName = 'Button';

export default Button;
