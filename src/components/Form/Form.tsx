import React, { useRef, useMemo } from "react";
import { FieldContext } from "./FieldContext";
import { FormStore } from "./Store";
import { BaseForm, Store } from "./typings";

interface FormProps extends BaseForm {
  form?: FormStore;
  initialValues?: Store;
  children?: React.ReactNode;
}

export default function Form(props: FormProps) {
  const { form, initialValues = {}, children } = props;
  const formStore = useRef<FormStore>(new FormStore());
  const mountRef = useRef(false);

  // if (!form) {
  //   formStore.current = new FormStore()
  // }
  if (!mountRef.current) {
    formStore.current.setInitialValues(initialValues);
    mountRef.current = true;
  }

  const formStoreContext = useMemo(() => {
    return {
      formStore: formStore.current,
    };
  }, [formStore]);

  return (
    <form>
      <FieldContext.Provider value={formStoreContext}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
