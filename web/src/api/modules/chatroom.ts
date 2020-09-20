import { IMessage, IUser } from 'shared/interface/model';
import { net } from '../index';

const baseApiPath = '/api/chatroom';
export const getChatroomMessages = (data?: any) =>
  net.get<IMessage[]>(`${baseApiPath}/messages`, {
    params: data,
  })

export const getChatroomUsers = (data?: any) =>
  net.get<IUser[]>(`${baseApiPath}/users`, {
    params: data,
  })
