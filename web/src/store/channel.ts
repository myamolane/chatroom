import { createModel } from 'hox';
import { UseModel } from 'hox/types';
import { useState } from 'react';
import { IMessage } from 'shared/interface/model';

interface IUseChannel {
  messages: IMessage[];
  append: (message: IMessage) => void;
}
// interface IUseChannelArgs {}

export function useChannel(): IUseChannel {
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const append = useCallback((message: IMessage) => {
  //   console.log('msg:', messages);
  //   setMessages([...messages, message]);
  // }, []);
  const append = (message: IMessage) => {
    setMessages([...messages, message]);
  };
  return { messages, append };
}

const channelStore: { [key: string]: UseModel<IUseChannel> } = {};

export function getChannel(key: string) {
  let useStore = channelStore[key];
  if (!useStore) {
    useStore = createModel<IUseChannel, null>(useChannel);
  }
  return useStore;
}
