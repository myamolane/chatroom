export interface BaseDataModel {
  createdAt: number;
  updatedAt: number;
}

export interface IMessage extends BaseDataModel {
  id: string;
  content: string;
  user: string;
}

export interface IUser extends BaseDataModel {
  id: string;
  name: string;
}
