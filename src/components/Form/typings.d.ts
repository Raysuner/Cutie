import React from 'react'
import { IFieldContext } from './FieldContext';

export type BaseForm = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
>
export type Store = { [key: string]: any }

export interface FieldProps {
  name?: string;
  label?: string;
  initValue?: any;
  valuePropName?: string;
  triggerPropName?: string;
  children?: React.ReactNode;
  fieldContext?: IFieldContext;
  getValueFromEvent?: Function;
}

export interface FieldsEntity {
  onStoreChange: Function;  
  props: FieldProps
}
