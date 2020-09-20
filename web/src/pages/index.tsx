import { deviceId, register } from '@/common/device';
import { socket } from '@/utils/socket';
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
  const onEnter = useCallback(() => {
    register();
    socket.emit('register', deviceId, name);
  }, [name]);
  if (deviceId) {
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
