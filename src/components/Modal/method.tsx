import React, { ReactElement } from 'react';
import Icon from '../Icon';
import { MethodModalConfig } from './interface';
import customRender from '../../utils/react-dom';
import Modal from './Modal';

interface Root {
  render: (app: ReactElement) => void;
  _unmount: () => void;
}

export const destoryList: Array<() => void> = [];

function transformConfig(config: MethodModalConfig) {
  let icon = config.icon;
  if (!icon && icon !== null) {
    if (config.isNotice) {
      switch (config.noticeType) {
        case 'info':
          icon = <Icon type="AiFillInfoCircle" color="rgb(22,93,255)" />;
          break;
        case 'success':
          icon = <Icon type="AiFillCheckCircle" color="rgb(0, 180, 42)" />;
          break;
        case 'warning':
          icon = (
            <Icon type="AiFillExclamationCircle" color="rgb(255, 125, 0)" />
          );
          break;
        case 'error':
          icon = <Icon type="AiFillCloseCircle" color="rgb(245, 63, 63)" />;
          break;
        default:
          break;
      }
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
      ),
    hideCancel: config.isNotice
  };
}

function method(config: MethodModalConfig) {
  let root: Root;
  const div = document.createElement('div');
  document.body.appendChild(div);

  let modalConfig = transformConfig({
    ...config,
    visible: true,
    onOk,
    onCancel
  });
  render(modalConfig);
  destoryList.push(close);

  return {
    update,
    close
  };

  function onOk() {
    config.onOk?.();
    close();
  }

  function onCancel() {
    config.onCancel?.();
    close();
  }

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
}

export default method;
