import { useMemo, useRef } from 'react'
import FieldContext from './FieldContext'
import { FormStore } from './FormStore'
import type { Store } from './typings'

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>
// TODO v1 children为函数的情况
// type RenderFn = (values: Store) => JSX.Element | React.ReactNode;

export interface FormProps<Values = any> extends BaseFormProps {
  initialValues?: Store
  children?: React.ReactNode
  onFinish?: (values: Values) => void
}

const Form: React.FC<FormProps> = ({ initialValues, children }) => {
  // TODO 未处理children为function的情况
  // const [, forceUpdate] = useState(null);

  const formStore = useRef<FormStore>(
    new FormStore(),
    // TODO 未处理children为function的情况
    // forceUpdate
  )

  const mountRef = useRef(false)
  formStore.current.setInitialValues(initialValues, !mountRef.current)
  if (!mountRef.current) {
    mountRef.current = true
  }

  const fieldContextValue = useMemo(
    () => ({
      formStore: formStore.current,
    }),
    [formStore],
  )

  console.log('fieldContextValue', fieldContextValue)

  return (
    <form>
      <FieldContext.Provider value={fieldContextValue}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
