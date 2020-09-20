import initTable from './generator';
import { IUser } from 'shared/interface/model';

const users = initTable<IUser>('id');

export default users;
