import React from 'react';
import UserListItem from './item';

export default function UserList(props) {
  const { users = [], className } = props;
  return (
    <div className={className}>
      {users.map(user => (
        <UserListItem key={user.id} user={user} />
      ))}
    </div>
  );
}
