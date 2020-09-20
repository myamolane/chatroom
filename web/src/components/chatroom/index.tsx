import { getChatroomMessages } from '@/api/modules/chatroom';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IMessage } from 'shared/interface/model';
import { socket } from '@/utils/socket';
import { makeMessage } from '@/utils/message';
import useUserStore from '@/store/user';
import Message from '../message'
import { RichTextarea } from '../rich-input';
import styles from './index.less';

export default function Chatroom() {
  const [messages, setMessages] = useState<IMessage[]>([]);


  const onMsg = useCallback((msg, chatroomId) => {
    if (chatroomId !== 'default') {
      return;
    }
    setMessages([...messages, msg]);
  }, [messages]);
  useEffect(() => {
    getChatroomMessages().then((data) => {
      setMessages(data);
    });
  }, []);
  useEffect(() => {
    const { user } = useUserStore.data || {};
    if (!user) {
      return () => {};
    }
    socket.emit('join', { id: useUserStore.data?.user.id, name: '' }, 'default');
    socket.on('msg', onMsg);
    return () => {
      socket.emit('leave', {  }, 'default');
      socket.off('msg', onMsg);
    }
  }, [onMsg]);

  const submit = useCallback((content) => {
    socket.emit('msg', makeMessage(content), 'default');
  }, []);
  const messageBlockRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const messageBlock = messageBlockRef.current;
    if (messageBlock) {
      messageBlock.scrollTop = messageBlock.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.room}>
      <div ref={messageBlockRef} className={styles.messageBlock}>
        {messages.map(msg => <Message className={styles.message} message={msg} />)}
      </div>
      {/* <RichInput /> */}
      <RichTextarea onSubmit={submit} className={styles.inputBlock} />
    </div>
  )
}
