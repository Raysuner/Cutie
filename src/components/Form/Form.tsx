import React, { useRef, useMemo } from 'react';
import { FieldContext } from './FieldContext';
import { FormStore } from './Store';
import { BaseForm, Store } from './typings';

interface FormProps extends BaseForm {
  form?: FormStore;
  initialValues?: Store;
  children?: React.ReactNode;
}

export default function Form(props: FormProps) {
  const { form, initialValues = {}, children } = props;
  const formStore = useRef<FormStore>();
  const mountRef = useRef(false);

  if (!formStore.current) {
    if (!form) {
      formStore.current = new FormStore();
    } else {
      formStore.current = form;
    }
  }

  if (!mountRef.current) {
    formStore.current.setInitialValues(initialValues);
    mountRef.current = true;
  }

  const formStoreContext = useMemo(() => {
    return {
      formStore: formStore.current!
    };
  }, []);

  return (
    <form>
      <FieldContext.Provider value={formStoreContext}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
