import React, {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  MouseEvent,
  ForwardedRef
} from 'react';
import cs from 'classnames';
import Icon from '../Icon';
import Divider from '../Divider';
import Button from '../Button';
import IconHover from './IconHover';
import Portal from '../Portal';
import { ModalProps, MethodModalConfig, MethodModal } from './interface';
import method, { destoryList } from './method';
import './Modal.less';

const prefixCls = 'cutie-modal';

const InternalModal: ForwardRefRenderFunction<unknown, ModalProps> = (
  props,
  ref
) => {
  const {
    className,
    style,
    visible,
    title,
    onOk,
    onCancel,
    okText = 'OK',
    cancelText = 'Cancel',
    width,
    closable = true,
    afterClose,
    footer,
    mask = true,
    maskClosable = false,
    maskStyle,
    bodyStyle,
    footerStyle,
    closeIcon,
    keyboard,
    destoryOnClose,
    container = document.body,
    hideCancel,
    children
  } = props;

  const [destoryChildren, setDestoryChildren] = useState(false);

  const handleClose = (
    e: MouseEvent<HTMLElement>,
    cb?: (e: MouseEvent<HTMLElement>) => void
  ) => {
    cb?.(e);
    if (destoryOnClose) {
      setDestoryChildren(true);
    }
  };

  useEffect(() => {
    if (!visible) {
      afterClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (!keyboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel?.(e);
        if (destoryOnClose) {
          setDestoryChildren(true);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible && destoryOnClose) {
      setDestoryChildren(false);
    }
  }, [visible, destoryOnClose]);

  const renderFooter = (): ReactNode => {
    if (footer === null) {
      return null;
    } else {
      const footerNode = footer || (
        <div className={`${prefixCls}-footer`} style={footerStyle}>
          {!hideCancel && (
            <Button onClick={(e) => handleClose(e, onCancel)}>
              {cancelText}
            </Button>
          )}
          <Button type="primary" onClick={(e) => handleClose(e, onOk)}>
            {okText}
          </Button>
        </div>
      );
      return (
        <>
          <Divider />
          {footerNode}
        </>
      );
    }
  };

  return (
    <Portal visible={visible} container={container}>
      <div
        className={cs(prefixCls, className)}
        style={{ ...style, width, display: visible ? 'block' : 'none' }}
        ref={ref as ForwardedRef<HTMLDivElement>}
      >
        {mask && (
          <div
            className={`${prefixCls}-mask`}
            style={maskStyle}
            onClick={(e) => {
              if (maskClosable) {
                handleClose(e, onCancel);
              }
            }}
          />
        )}
        <div className={`${prefixCls}-inner-modal`}>
          <div className={`${prefixCls}-header`}>
            <div className={`${prefixCls}-title`}>{title}</div>
            {closable && (
              <div
                className={`${prefixCls}-close-icon`}
                onClick={(e) => handleClose(e, onCancel)}
              >
                <IconHover>
                  {closeIcon || <Icon type="AiOutlineClose" size="12px" />}
                </IconHover>
              </div>
            )}
          </div>
          <Divider />
          <div className={`${prefixCls}-body`} style={bodyStyle}>
            {destoryChildren ? null : children}
          </div>
          {renderFooter()}
        </div>
      </div>
    </Portal>
  );
};

const Modal: MethodModal = forwardRef<unknown, ModalProps>(
  InternalModal
) as MethodModal;

(['info', 'success', 'warning', 'error'] as const).forEach((type) => {
  Modal[type] = (config: MethodModalConfig) => {
    return method({
      ...config,
      isNotice: true,
      noticeType: type
    });
  };
});

Modal.destoryAll = () => {
  while (destoryList.length) {
    const close = destoryList.pop();
    close?.();
  }
};

export default Modal;
