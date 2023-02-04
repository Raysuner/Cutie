import React, { createRef, ReactElement, useRef } from 'react';
import {
  MethodModalConfig,
  MethodModalReturnType,
  MethodType
} from '../interface';
import HookModalList, { HookModalListRefType } from './HookModalList';
import HookModal from './HookModal';
import { destoryList } from '../method';

function useModal(): [MethodType, ReactElement] {
  let uuid = 0;
  const hookModalListRef = useRef<HookModalListRefType>();
  const hookModalList = <HookModalList ref={hookModalListRef} />;

  function addModal(config: MethodModalConfig): MethodModalReturnType {
    uuid += 1;
    const hookModalRef = createRef<MethodModalReturnType>();

    const afterClose = () => {
      config.afterClose?.();
      hookModalListRef.current?.removeInstance?.(hookModal);
    };

    const hookModal = (
      <HookModal
        key={uuid}
        {...config}
        afterClose={afterClose}
        ref={hookModalRef}
      />
    );

    hookModalListRef.current?.addInstance?.(hookModal);

    function close() {
      hookModalRef.current?.close?.();
    }

    function update(newConfig: MethodModalConfig) {
      hookModalRef.current?.update?.(newConfig);
    }

    destoryList.push(close);

    return {
      close,
      update
    };
  }

  const modal = {
    show(config: MethodModalConfig) {
      return addModal(config);
    }
  } as MethodType;

  (['info', 'success', 'warning', 'error'] as const).forEach((type) => {
    modal[type] = (config: MethodModalConfig) => {
      return addModal({
        ...config,
        isNotice: true,
        noticeType: type
      });
    };
  });

  return [modal, hookModalList];
}

export default useModal;
