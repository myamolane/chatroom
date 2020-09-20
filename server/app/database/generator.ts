import { BaseDataModel, ITable } from './interface';

export default function initTable<T extends BaseDataModel>(pk = 'id', initialData: T[] = []): ITable<T> {
  const data: T[] = [ ...initialData ];
  function add(item: T) {
    item.createdAt = Date.now();
    data.push(item);
    return item;
  }

  function remove(deleteItem: T) {
    data.filter(item => item[pk] === deleteItem[pk]);
  }

  function findOne(key) {
    return data.find(item => item[pk] === key);
  }

  function update(newItem: T) {
    const index = data.findIndex(item => item[pk] === newItem[pk]);
    if (index === -1) {
      throw new Error('data not found');
    }
    newItem.updatedAt = Date.now();
    data.splice(index, 1, newItem);
    return newItem;
  }

  function findAll(key?: string) {
    return data.filter(item => !key || item[pk] === key);
  }

  function addOrUpdate(item: T) {
    try {
      update(item);
    } catch (e) {
      add(item);
    }
    return item;
  }

  return { add, remove, findOne, update, findAll, addOrUpdate };
}
