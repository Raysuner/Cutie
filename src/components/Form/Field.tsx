import React from 'react';
import { FieldContext } from './FieldContext';
import { FieldProps, FieldsEntity, Store } from './typings';

class Field extends React.Component<FieldProps> implements FieldsEntity {
  constructor(props: FieldProps) {
    super(props);
    props.fieldContext?.formStore.initFieldEntity(this);
  }

  public componentDidMount() {
    this.props.fieldContext?.formStore.registerFieldEntity(this);
  }

  public reRender() {
    this.forceUpdate();
  }

  public onStoreChange(
    prevStore: Store,
    curStore: Store,
    namePathList: string[] | null,
    type: string
  ) {
    const name = this.props.name!;
    const prevValue = prevStore[name];
    const curValue = curStore[name];
    const isMatched = !!namePathList!.includes(name);

    if (!namePathList || (isMatched && prevValue !== curValue)) {
      this.reRender();
    }
  }

  private getDefaultValueFromEvent(valuePropName: string, ...args: any[]) {
    const event = args[0] as React.ChangeEvent<HTMLInputElement>;
    if (event && event.target && valuePropName in event.target) {
      // @ts-ignore
      return (event.target as HTMLInputElement)[valuePropName];
    }
  }

  private getControlled(childProps: { [key: string]: any }) {
    const {
      name,
      valuePropName = 'value',
      triggerPropName = 'onChange',
      getValueFromEvent,
      fieldContext
    } = this.props;
    const value = this.props.fieldContext?.formStore.getFieldValue(name!);
    const trigger = (...args: any[]) => {
      let newValue: any;
      if (!!getValueFromEvent) {
        newValue = getValueFromEvent(...args);
      } else {
        newValue = this.getDefaultValueFromEvent(valuePropName, ...args);
      }
      fieldContext?.formStore.setFieldValue(name!, newValue);
      const changeFunc = childProps[triggerPropName];
      if (changeFunc) {
        changeFunc(...args);
      }
    };
    const controllData = {
      ...childProps,
      [valuePropName]: value,
      [triggerPropName]: trigger
    };
    console.log('controllData', controllData);
    return controllData;
  }

  public render() {
    let node: React.ReactNode;
    const { children } = this.props;
    if (React.isValidElement(children)) {
      node = React.cloneElement(children, this.getControlled(children.props));
    } else {
      node = children;
    }
    console.log('node', node);
    return node;
  }
}

export default function FieldWrapper(props: Omit<FieldProps, 'fieldContext'>) {
  const fieldContext = React.useContext(FieldContext);
  console.log('fieldContext', fieldContext);
  return (
    <div style={{ display: 'flex', marginBottom: 12 }}>
      <div style={{ width: 100 }}>{props.label}</div>
      <Field {...props} fieldContext={fieldContext} />
    </div>
  );
}
