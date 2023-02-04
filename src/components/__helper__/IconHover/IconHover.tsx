import React from 'react';
import { IconHoverProps } from '../../Modal/interface';
import cs from 'classnames';
import './IconHover.less';

const prefixCls = 'cutie-icon-hover';

export default function IconHover(props: IconHoverProps) {
  const { className, style, children, size = 'medium' } = props;

  return (
    <div
      className={cs(prefixCls, className, {
        [`${prefixCls}-size-${size}`]: size
      })}
      style={style}
    >
      {children}
    </div>
  );
}
