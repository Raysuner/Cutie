import React, { ReactElement } from 'react';
import Icon from '../Icon';
import { MethodModalProps } from './interface';
import customRender from '../../utils/react-dom';
import Modal from './Modal';

const destoryList: Array<() => void> = [];

function transformConfig(config: MethodModalProps) {
  let icon = config.icon;
  if (!icon && icon !== null) {
    switch (config.noticeType) {
      case 'info':
        icon = <Icon type="AiFillInfoCircle" />;
        break;
      case 'success':
        icon = <Icon type="AiFillCheckCircle" />;
        break;
      case 'warning':
        icon = <Icon type="AiFillExclamationCircle" />;
        break;
      case 'error':
        icon = <Icon type="AiFillCloseCircle" />;
        break;
      default:
        icon = <Icon type="AiFillExclamationCircle" />;
        break;
    }
  }
  return {
    ...config,
    icon,
    title:
      icon === null && config.title === null ? null : (
        <span>
          {icon}
          {config.title}
        </span>
      )
  };
}

function method(props: MethodModalProps) {
  let root: { render: (app: ReactElement) => void; unmount: () => void };
  const div = document.createElement('div');
  document.body.appendChild(div);
  let modalConfig = transformConfig({ ...props, visible: true });
  render(modalConfig);
  destoryList.push(close);

  function render(rendProps: MethodModalProps) {
    const container = rendProps.container ?? document.body;
    const modal = <Modal {...props} />;
    if (root) {
      root.render(modal);
    } else {
      root = customRender(modal, container);
    }
  }

  function close() {
    modalConfig.visible = false;
    modalConfig.afterClose = () => {
      modalConfig.afterClose?.();
      destory();
    };
    render(modalConfig);
  }

  function update(newConfig: MethodModalProps) {
    modalConfig = transformConfig({
      ...modalConfig,
      ...newConfig
    });
    render(modalConfig);
  }

  function destory() {
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }

    for (let i = 0; i < destoryList.length; i++) {
      if (destoryList[i] === close) {
        destoryList.splice(i, 1);
        break;
      }
    }
  }

  return {
    update,
    close
  };
}

export default method;