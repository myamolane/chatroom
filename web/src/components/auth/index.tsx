import React from 'react';
import { deviceId } from '@/common/device';
import { Redirect } from 'umi';

export default function Auth(props: React.PropsWithChildren<any>) {
  console.log('auth');
  if (deviceId) {
    return <Redirect to="/home" />
  }
  return (
    <div>
      {props.children}
    </div>
  )
}
