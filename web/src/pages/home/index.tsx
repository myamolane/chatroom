import Chatroom from '@/components/chatroom'
import UserList from '@/components/user-list';
import socket from '@/common/shared-ws';
import { useEffectOnce } from 'react-use';
import { getChatroomUsers } from '@/api/modules/chatroom';
import React, { useCallback, useEffect, useState } from 'react'
import { IUser } from 'shared/interface/model';
import styles from './index.less';

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const onJoin = useCallback((user) => {
    const hasJoined = !!users.find(item => item.id === user.id);
    if (!hasJoined) {
      setUsers([...users, user]);
    }
  }, [users]);

  useEffectOnce(() => {
    getChatroomUsers().then((data) => {
      setUsers(data);
    })
  })
  useEffect(() => {
    socket.emit('join', 'default');
    socket.on('join', onJoin);

    return () => {
      socket.off('join', onJoin);
    }
  }, [onJoin]);
  return (
    <div className={styles.page}>
      <UserList users={users} className={styles.userList} />
      <Chatroom />
    </div>
  )
}
