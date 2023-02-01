import React, { ReactElement } from 'react';
import Icon from '../Icon';
import { MethodModalConfig } from './interface';
import customRender from '../../utils/react-dom';
import Modal from './Modal';

export const destoryList: Array<() => void> = [];

function transformConfig(config: MethodModalConfig) {
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

function method(config: MethodModalConfig) {
  let root: { render: (app: ReactElement) => void; _unmount: () => void };
  const div = document.createElement('div');
  document.body.appendChild(div);
  let modalConfig = transformConfig({ ...config, visible: true });
  render(modalConfig);
  destoryList.push(close);

  function render(rendProps: MethodModalConfig) {
    const modal = <Modal {...rendProps}>{rendProps.content}</Modal>;
    if (root) {
      root.render(modal);
    } else {
      root = customRender(modal, div);
    }
  }

  function close() {
    const afterClose = config.afterClose;
    modalConfig.visible = false;
    modalConfig.afterClose = () => {
      afterClose?.();
      destory();
    };
    render(modalConfig);
  }

  function update(newConfig: MethodModalConfig) {
    modalConfig = transformConfig({
      ...modalConfig,
      ...newConfig
    });
    render(modalConfig);
  }

  function destory() {
    root._unmount();
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
