import useUserStore from '@/store/user';
import { IMessage } from 'shared/interface/model';

export function makeMessage(content: string, type = 'text') {
  return { content, user: useUserStore.data?.user.id, type } as IMessage;
}