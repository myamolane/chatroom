import { IMessage } from '@/store/channel';
import { Avatar } from 'antd';
import React from 'react';
import cx from 'classnames';
import Pop from '../pop';
import styles from './index.less';

interface MessageContentProps {
  content?: string;
  arrowPosition?: 'right' | 'left';
}

function MessageContent(props: MessageContentProps) {
  const { arrowPosition, content = '' } = props;
  return (
    <Pop arrowPosition={arrowPosition} className={styles.content}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Pop>
  );
}

interface MessageProps {
  message: IMessage;
  className?: string;
}

export default function Message(props: MessageProps) {
  const { message, className } = props;
  const { content, user } = message;
  const sentBySelf = false;
  return (
    <div
      className={cx(
        styles.message,
        { [styles.selfMessage]: sentBySelf },
        className,
      )}
    >
      {sentBySelf && <MessageContent arrowPosition="right" content={content} />}
      <Avatar className={styles.avatar}>{user}</Avatar>
      {sentBySelf || <MessageContent content={content} />}
    </div>
  );
}
