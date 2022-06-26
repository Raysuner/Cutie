import Form from './Form';
import Field from './Field';

const InternalForm = Form;
type InternalFormType = typeof InternalForm;

interface RefFormType extends InternalFormType {
  Item: typeof Field;
}

const RefForm: RefFormType = InternalForm as RefFormType;

RefForm.Item = Field;

export { Field as Item };

export default RefForm;
