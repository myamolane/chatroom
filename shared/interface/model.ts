export interface BaseDataModel {
  createdAt: number;
  updatedAt: number;
}

export interface IMessage extends BaseDataModel {
  id: string;
  content: string;
  user: string;
  userName?: string;
  type: 'text' | 'image' | 'rich-text'
}

export interface IUser extends BaseDataModel {
  id: string;
  name: string;
}

export interface IChatroom extends BaseDataModel {
  id: string;
  messages: IMessage[];
  users: string[];
  name: string;
}
