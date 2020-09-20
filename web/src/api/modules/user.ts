import { IUser } from 'shared/interface/model';
import { net } from '../index';

const baseApiPath = '/api/users';
export const getUsers = (data?: any) =>
  net.get<IUser[]>(`${baseApiPath}/`, {
    params: data,
  })