import { net } from '../index';

const baseApiPath = '/api/file';
export const uploadFile = (data?: any) =>
  net.post(`${baseApiPath}/upload`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
