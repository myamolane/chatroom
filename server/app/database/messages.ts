import { IMessage } from 'shared/interface/model';

import initTable from './generator';
const messages = initTable<IMessage>('id');
export default messages;
