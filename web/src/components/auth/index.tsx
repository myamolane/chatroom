import useUserStore from '@/store/user';
import { Spin } from 'antd';
import React from 'react';
import { useRequest, Redirect } from 'umi';

export default function Auth(props: React.PropsWithChildren<any>) {
  const { login, user } =  useUserStore();
  const { loading } = useRequest(login)
  if (loading) {
    return <div><Spin spinning /></div>
  }
  if (!user.name) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      {props.children}
    </div>
  )
}
