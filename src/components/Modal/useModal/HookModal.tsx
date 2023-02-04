import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { MethodModalConfig } from '../interface';
import Modal from '../Modal';
import { transformConfig } from '../method';

const HookModal = forwardRef<unknown, MethodModalConfig>((props, ref) => {
  const [modalProps, setModalProps] = useState<MethodModalConfig>({
    ...props,
    visible: true
  });

  useImperativeHandle(ref, () => {
    return {
      update(config: MethodModalConfig) {
        setModalProps((curModalConfig) =>
          transformConfig({
            ...curModalConfig,
            ...config
          })
        );
      },
      close() {
        setModalProps((curModalProps) => ({
          ...curModalProps,
          visible: false
        }));
      }
    };
  });

  const onCancel = () => {
    modalProps.onCancel?.();
    setModalProps((curModalProps) => ({
      ...curModalProps,
      visible: false
    }));
  };

  const onOk = () => {
    modalProps.onOk?.();
    setModalProps((curModalProps) => ({
      ...curModalProps,
      visible: false
    }));
  };

  return (
    <Modal {...modalProps} onCancel={onCancel} onOk={onOk}>
      {modalProps.content}
    </Modal>
  );
});

HookModal.displayName = 'HookModal';

export default HookModal;
