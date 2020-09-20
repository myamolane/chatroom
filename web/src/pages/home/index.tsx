import { getUsers } from '@/api/modules/user';
import Chatroom from '@/components/chatroom'
import UserList from '@/components/user-list';
import { socket } from '@/utils/socket';
import { useEffectOnce } from 'react-use';
import React, { useCallback, useEffect, useState } from 'react'
import { IUser } from 'shared/interface/model';
import styles from './index.less';

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const onJoin = useCallback((user) => {
    setUsers([...users, user]);
  }, [users]);

  useEffectOnce(() => {
    getUsers().then((data) => {
      setUsers(data);
    })
  })
  useEffect(() => {
    socket.emit('join', 'default');
    socket.on('register', onJoin);

    return () => {
      socket.off('register', onJoin);
    }
  }, [onJoin]);
  return (
    <div className={styles.page}>
      <UserList users={users} className={styles.userList} />
      <Chatroom />
    </div>
  )
}
