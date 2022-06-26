import { createContext } from "react";
import { FormStore } from "./Store";

export interface IFieldContext {
  formStore: FormStore;
}

export const FieldContext = createContext<IFieldContext>({} as IFieldContext)

FieldContext.displayName = 'FieldContext'