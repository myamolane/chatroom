export interface BaseDataModel {
  createdAt: number;
  updatedAt: number;
}

export interface IMessage extends BaseDataModel {
  id: string;
  content: string;
  user: string;
  type: 'text' | 'image' | 'rich-text'
}

export interface IUser extends BaseDataModel {
  id: string;
  name: string;
}
