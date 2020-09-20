import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { IUser } from 'shared/interface/model';
import styles from './index.less';

interface IUserListItemProps {
  user: IUser;
}

export default function UserListItem(props: IUserListItemProps) {
  const { user } = props;
  const { name = '匿名' } = user;
  return (
    <div className={styles.user}>
      <UserOutlined />
      <span>{name}</span>
    </div>
  )
}
