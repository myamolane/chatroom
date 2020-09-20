import { uploadFile } from '@/api';

export default function upload(file: File) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  uploadFile(formData);
}