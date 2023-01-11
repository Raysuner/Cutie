import React from 'react';
import * as AntIcon from 'react-icons/ai';
import './Icon.less';

type IconType = keyof typeof AntIcon;

export interface IconProps {
  type: IconType;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  size?: string;
}

export default function Icon(props: IconProps) {
  const { type, ...restProps } = props;
  const IconComponent = AntIcon[type];
  return <IconComponent {...restProps} />;
}
