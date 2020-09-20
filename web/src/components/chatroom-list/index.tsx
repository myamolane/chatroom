import React, { FunctionComponent, useState } from 'react';
import ChatroomItem from './item';

interface ChatroomListProps extends FunctionComponent {
  className?: string;
}

export default function ChatroomList(props: ChatroomListProps) {
  const { className } = props;
  const [chatrooms, setChatrooms] = useState([{ name: '公共频道'}]);
  return <div className={className}>
    {chatrooms.map(chatroom => <ChatroomItem chatroom={chatroom} />)}
  </div>;
}
