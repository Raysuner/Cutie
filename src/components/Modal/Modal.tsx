import React, { useState } from 'react';
import cs from 'classnames';
import Icon from '../Icon';
import Divider from '../Divider';
import Button from '../Button';
import IconHover from './IconHover';
import { ModalProps } from './interface';
import './Modal.less';

const prefixCls = 'cutie-modal';

const InternalModal: React.ForwardRefRenderFunction<unknown, ModalProps> = (
  props,
  ref
) => {
  const {
    className,
    style,
    visible,
    title,
    onOk,
    onCancle,
    okText = 'OK',
    cancleText = 'Cancle',
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
    children
  } = props;

  const [isVisible, setIsVisible] = useState(visible);

  const handleCancle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsVisible(false);
    onCancle?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsVisible(false);
    onOk?.(e);
  };

  const handleMaskClick = () => {
    if (maskClosable) {
      setIsVisible(false);
    }
  };

  const handleCloseIconClick = () => {
    if (closable) {
      setIsVisible(false);
    }
  };

  const renderFooter = (): React.ReactNode => {
    if (footer === null) {
      return null;
    } else if (footer) {
      return (
        <>
          <Divider />
          {footer}
        </>
      );
    } else {
      return (
        <>
          <Divider />
          <div className={`${prefixCls}-footer`} style={footerStyle}>
            <Button onClick={handleCancle}>{cancleText}</Button>
            <Button type="primary" onClick={handleOk}>
              {okText}
            </Button>
          </div>
        </>
      );
    }
  };

  return isVisible ? (
    <div
      className={cs(prefixCls, className)}
      style={{ ...style, width }}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
    >
      {mask && (
        <div
          className={`${prefixCls}-mask`}
          style={maskStyle}
          onClick={handleMaskClick}
        />
      )}
      <div className={`${prefixCls}-inner-modal`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>{title}</div>
          <div
            className={`${prefixCls}-close-icon`}
            onClick={handleCloseIconClick}
          >
            <IconHover>
              {closeIcon || <Icon type="AiOutlineClose" size="12px" />}
            </IconHover>
          </div>
        </div>
        <Divider />
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {children}
        </div>
        {renderFooter()}
      </div>
    </div>
  ) : null;
};

const Modal = React.forwardRef<unknown, ModalProps>(InternalModal);

export { type ModalProps };
export default Modal;
