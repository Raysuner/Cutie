import React from 'react';
import './LoadingIcon.less';
import cs from 'classnames';

interface LoadingIconProps {
  notOnly?: boolean;
}

export default function LoadingIcon(props: LoadingIconProps) {
  const { notOnly = true } = props;
  return <span className={cs('loading', { 'not-only': notOnly })} />;
}
