import { getImageUrl } from 'shared/utils/url';
import { Avatar, Image } from 'antd';
import React from 'react';
import cx from 'classnames';
import { IMessage } from 'shared/interface/model';
import Pop from '../pop';
import styles from './index.less';

interface MessageContentProps {
  content?: string;
  arrowPosition?: 'right' | 'left';
  contentType?: 'text' | 'image' | 'rich-text';
}

function MessageContent(props: MessageContentProps) {
  const { arrowPosition, content = '', contentType } = props;
  let contentNode;
  switch (contentType) {
    case 'image':
      contentNode = <Image src={getImageUrl(content)} />;
      break;
    case 'rich-text':
      contentNode = <div dangerouslySetInnerHTML={{ __html: content }} />;
      break;
    case 'text':
    default:
      contentNode = <>{content}</>;
  }
  return (
    <Pop arrowPosition={arrowPosition} className={styles.content}>
      {contentNode}
    </Pop>
  );
}

interface MessageProps {
  message: IMessage;
  className?: string;
}

export default function Message(props: MessageProps) {
  const { message, className } = props;
  const { content, user, type } = message;
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
      {sentBySelf || <MessageContent contentType={type} content={content} />}
    </div>
  );
}
