import React, { FormHTMLAttributes, ReactNode } from 'react';
import { IFieldContext } from './FieldContext';

export type BaseForm = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;
export type Store = { [key: string]: any };

export interface FieldProps {
  name?: string;
  label?: string;
  initialValue?: any;
  valuePropName?: string;
  triggerPropName?: string;
  children?: ReactNode;
  fieldContext?: IFieldContext;
  getValueFromEvent?: Function;
}

export interface FieldsEntity {
  onStoreChange: Function;
  props: FieldProps;
}
