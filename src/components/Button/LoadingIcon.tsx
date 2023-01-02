import React from 'react';
import './LoadingIcon.less';
import cs from 'classnames';

interface LoadingIconProps {
  notOnlyIcon?: boolean;
}

export default function LoadingIcon(props: LoadingIconProps) {
  const { notOnlyIcon = true } = props;
  return <span className={cs('loading', { 'not-only-icon': notOnlyIcon })} />;
}
