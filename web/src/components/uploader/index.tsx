import { Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadProps } from 'antd/lib/upload/Upload';
import React from 'react'

interface IUploaderProps {
  onSuccess?: (file: UploadFile) => void;
  onError?: (file: UploadFile) => void;
}

export default function Uploader(props: React.PropsWithChildren<IUploaderProps>) {
  const { onSuccess, onError } = props;
  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    method: 'post',
    showUploadList: false,
    onChange(info) {
      console.log('info:', info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        onSuccess?.(info.file);
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        onError?.(info.file);
      }
    },
  };
  return (
    <Upload {...uploadProps}>
      {props.children}
    </Upload>
  )
}
