export interface ITable<T> {
  add: (item: T) => T;

  remove: (deleteItem: T) => void;

  findOne: (key: string) => T | undefined;

  update: (newItem: T) => T;

  findAll: (key?: string) => T[];

  addOrUpdate: (item: T) => T;
}

export interface BaseDataModel {
  createdAt: number;
  updatedAt: number;
}

export interface ITables {
  [tableKey: string]: ITable<any>
}
