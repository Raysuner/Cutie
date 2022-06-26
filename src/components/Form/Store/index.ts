import { FieldsEntity, Store } from '../typings'

export class FormStore {
  private initStore = {}
  private store: Store = {}
  private fieldsEntities: FieldsEntity[] = []

  public initFieldEntity (field: FieldsEntity) {
    const { name, initValue } = field.props
    if (name) {
      const prevValue = this.store[name]
      if (prevValue !== initValue) {
        this.store = { ...this.store, [name]: initValue }
      }
    }
  }

  private getFieldEntities () {
    return this.fieldsEntities.filter(it => it.props.name)
  }

  public registerFieldEntity (fieldEntity: FieldsEntity) {
    console.log('fields', this.fieldsEntities)
    this.fieldsEntities.push(fieldEntity)
  }

  private notifyObserver (
    prevStore: Store,
    curStore: Store,
    namePathList: string[] | null,
    type: string
  ) {
    this.getFieldEntities().forEach(({ onStoreChange }) => {
      onStoreChange(prevStore, curStore, namePathList, type)
    })
  }

  public getFieldValue (name: string) {
    return this.store[name]
  }

  public getFieldsValue () {
    return { ...this.store }
  }

  public setFieldValue (name: string, value: any) {
    const prevStore = { ...this.store }
    if (this.store[name] === value) {
      return
    }
    this.store = { ...this.store, [name]: value }
    this.notifyObserver(prevStore, this.store, [name], 'update')
  }

  public setFieldsValue (values: Store) {
    const prevStore = { ...this.store }
    this.store = { ...this.store, ...values }
    this.notifyObserver(prevStore, this.store, null, 'reset')
  }

  public setInitialValues (values: Store) {
    this.initStore = values
    this.store = { ...values }
  }

  public resetFieldsValue () {
    this.setFieldsValue(this.initStore)
  }
}
