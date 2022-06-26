import * as React from 'react';
import type { FormStore } from './FormStore';

export interface FieldContextValues {
  formStore: FormStore;
}

// @ts-ignore
const Context = React.createContext<FieldContextValues>({});

Context.displayName = 'FieldContext';

export default Context;
