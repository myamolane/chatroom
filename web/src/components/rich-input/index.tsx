import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import cx from 'classnames';
import { Input } from 'antd';
import { useControllableValue } from 'ahooks';
import TextArea from 'antd/lib/input/TextArea';
import socket from '@/common/shared-ws';
import { makeMessage } from '@/utils/message';
import upload from '@/utils/upload';
import Uploader from '../uploader';
import styles from './index.less';

interface RichInputProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
  onSubmit?: (value?: string) => void;
  className?: string;
  inputClassName?: string;
  value?: string;
}

function sendImageMsg(path) {
  socket.emit('msg', makeMessage(path, 'image'), 'default');
}

function onUpload(uploadResult) {
  const { code, data } = uploadResult;
  if (code === 0) {
    sendImageMsg(data);
  }
}

function RichInputToolbar() {
  return (
    <div className={styles.toolbar}>
      <Uploader onSuccess={file => onUpload(file.response)}>
        <PictureOutlined onClick={() => {}} />
      </Uploader>
    </div>
  );
}

export function RichTextarea(props: RichInputProps) {
  const { onSubmit, className, inputClassName } = props;
  const [value, setValue] = useControllableValue<string>(props);
  const ref = useRef<TextArea>(null);
  const inComposition = useRef<boolean>(false);
  const getTextareaInstance = useCallback(() => {
    return ref.current?.resizableTextArea.textArea;
  }, []);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!e.altKey) {
          if (inComposition.current) {
            return;
          }
          e.preventDefault();
          if (onSubmit) {
            onSubmit(value);
          }
          setValue('');
        } else {
          setValue(value ? `${value}\r\n` : '\r\n');
        }
      }
    },
    [onSubmit, value, setValue],
  );

  useLayoutEffect(() => {
    const textarea = getTextareaInstance();
    if (textarea && textarea.selectionEnd === textarea.value.length) {
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [value, getTextareaInstance]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const { clipboardData } = e;
      const filesLength = clipboardData.files.length;
      for (let i = 0; i < filesLength; i += 1) {
        const file = clipboardData.files[i];
        upload(file).then(sendImageMsg);
      }
      if (filesLength) {
        e.preventDefault();
      }
    },
    [],
  );

  const onCompositionStart = useCallback(() => {
    inComposition.current = true;
  }, []);
  const onCompositionEnd = useCallback(() => {
    inComposition.current = false;
  }, []);
  return (
    <div className={cx(styles.richInput, className)}>
      <RichInputToolbar />
      <Input.TextArea
        autoSize={{ minRows: 5, maxRows: 5 }}
        ref={ref}
        value={value}
        bordered={false}
        className={cx(styles.textarea, inputClassName)}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        onPaste={handlePaste}
      />
    </div>
  );
}
