import React, {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useState
} from 'react';

export interface HookModalListRefType {
  addInstance: (instance: ReactElement) => void;
  removeInstance: (instance: ReactElement) => void;
}

const HookModalList = forwardRef((props, ref) => {
  const [instanceList, setInstanceList] = useState<ReactElement[]>([]);

  useImperativeHandle(ref, () => ({
    addInstance(instance: ReactElement) {
      setInstanceList((curValue) => [...curValue, instance]);
    },
    removeInstance(instance: ReactElement) {
      setInstanceList((curValue) =>
        curValue.filter((item) => item !== instance)
      );
    }
  }));

  return (
    <>
      {Children.map(instanceList, (child, index) =>
        cloneElement(child, { key: index })
      )}
    </>
  );
});

HookModalList.displayName = 'HookModalList';

export default HookModalList;
