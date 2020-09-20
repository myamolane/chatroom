import { updateUserInfo } from '@/api/modules/user';
import useUserStore from '@/store/user';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Input, Spin } from 'antd';
import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'umi';
import styles from './index.less';

export default function Login() {
  const [name, setName] = useState('');
  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );
  const { user, login } = useUserStore();
  const history = useHistory();
  const onEnter = useCallback(async () => {
    await updateUserInfo({
      ...user,
      name,
    })
    history.replace('/home');
  }, [name, user, history]);

  const { loading } = useRequest(login)
  if (loading) {
    return <div><Spin spinning /></div>
  }
  if (user && user.name) {
    return <Redirect to="/home" />;
  }
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h2>Chatroom-Demo</h2>
        <Input placeholder="输入聊天室昵称" value={name} onChange={onNameChange} />
        <Button className={styles.enter} icon={<ArrowRightOutlined />} shape="circle" onClick={onEnter} />
      </div>
    </div>
  );
}

Login.wrappers = ['@/components/auth'];
