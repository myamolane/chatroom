import { updateUserInfo } from '@/api/modules/user';
import useUserStore from '@/store/user';
import { EnterOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { Redirect } from 'umi';
import styles from './index.less';

export default function Login() {
  const [name, setName] = useState('');
  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );
  const { user } = useUserStore();
  const onEnter = useCallback(() => {
    updateUserInfo({
      ...user,
      name,
    })
  }, [name, user]);
  if (user.name) {
    return <Redirect to="/home" />;
  }
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h2>输入你的名字</h2>
        <Input value={name} onChange={onNameChange} />
        <Button icon={<EnterOutlined />} shape="circle" onClick={onEnter} />
      </div>
    </div>
  );
}

Login.wrappers = ['@/components/auth'];
