import React from 'react';
import cs from 'classnames';
import './LoadingIcon.less';

interface LoadingIconProps {
  notOnlyIcon?: boolean;
}

export default function LoadingIcon(props: LoadingIconProps) {
  const { notOnlyIcon = true } = props;
  return <span className={cs('loading', { 'not-only-icon': notOnlyIcon })} />;
}
