import Form from "./Form"
import Field from './Field'

type FormType = typeof Form

interface IFormType extends FormType {
  Item: typeof Field;
}

const RefFrom = Form as IFormType
RefFrom.Item = Field

export { Field as Item }

export default RefFrom