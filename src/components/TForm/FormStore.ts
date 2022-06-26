import type { FieldEntity, NotifyInfo, Store, ValuedNotifyInfo } from './typings';

export class FormStore {
  private store: Store = {};
  private fieldEntities: FieldEntity[] = [];
  private initialValues: Store = {};
  // TODO 未处理children为function的情况
  // private forceRootUpdate: () => void;

  // TODO 未处理children为function的情况
  // constructor(forceRootUpdate: () => void) {
  //   this.forceRootUpdate = forceRootUpdate;
  // }

  public setInitialValues = (initialValues: Store | undefined, init: boolean) => {
    this.initialValues = initialValues || {};
    if (init) {
      this.store = { ...this.store, ...initialValues };
    }
  };

  public getFieldValue = (name: string) => {
    return this.store[name];
  };

  public getFieldsValue = () => {
    return { ...this.store };
  };

  public setFieldsValue = (store: Store) => {
    const prevStore = this.store;

    if (store) {
      this.store = { ...this.store, ...store };
    }

    this.notifyObservers(prevStore, undefined, {
      type: 'valueUpdate',
      source: 'external',
    });
  };

  public updateValue = (name: string | undefined, value: any) => {
    if (name === undefined) return;
    const prevStore = this.store;
    this.store = { ...this.store, [name]: value };
    this.notifyObservers(prevStore, [name], {
      type: 'valueUpdate',
      source: 'internal',
    });
  };

  private getFieldEntities = () => {
    return this.fieldEntities.filter((field) => field.props.name);
  };

  public registerField = (entity: FieldEntity) => {
    console.log(entity.props.name, this.fieldEntities)
    this.fieldEntities.push(entity);
    // Set initial values
    // if (entity.props.initialValue !== undefined) {
    //   const prevStore = this.store;
    //   this.notifyObservers(prevStore, entity.props.name, {
    //     type: 'valueUpdate',
    //     source: 'internal',
    //   });
    // }

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
    };
  };

  public initEntityValue = (entity: FieldEntity) => {
    const { initialValue, name } = entity.props;
    if (name !== undefined) {
      const prevValue = this.store[name];

      if (prevValue === undefined) {
        this.store = { ...this.store, [name]: initialValue };
      }
    }
  };

  private notifyObservers = (
    prevStore: Store,
    namePathList: string[] | undefined,
    info: NotifyInfo,
  ) => {
    // TODO 未处理children为function的情况
    const mergedInfo: ValuedNotifyInfo = {
      ...info,
      store: this.getFieldsValue(),
    };
    this.getFieldEntities().forEach(({ onStoreChange }) => {
      onStoreChange(prevStore, namePathList, mergedInfo);
    });
  };
}
