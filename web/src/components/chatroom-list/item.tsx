import React from 'react'

export default function ChatroomItem(props) {
  const { chatroom } = props;
  return (
    <div>
      {chatroom.name}
    </div>
  )
}
