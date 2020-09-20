// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBody from '../../../app/middleware/body';

declare module 'egg' {
  interface IMiddleware {
    body: typeof ExportBody;
  }
}
