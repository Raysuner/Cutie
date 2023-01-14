import React from 'react';
import cs from 'classnames';
import { DividerProps } from './interface';
import './Divider.less';

const prefixCls = 'cutie-divider';

function InnerDivider(props: DividerProps) {
  const {
    className,
    style,
    textAlign = 'center',
    direction = 'horizontal',
    children
  } = props;
  return (
    <div
      className={cs(prefixCls, className, {
        [`${prefixCls}-${direction}`]: direction,
        [`${prefixCls}-with-text`]: children,
        [`${prefixCls}-with-text-${textAlign}`]: textAlign && children
      })}
      style={style}
    >
      {React.isValidElement(children) && children}
      {typeof children === 'string' && (
        <span className={`${prefixCls}-text`}>{children}</span>
      )}
    </div>
  );
}

const Divider = React.forwardRef<unknown, DividerProps>(InnerDivider);

export default Divider;
