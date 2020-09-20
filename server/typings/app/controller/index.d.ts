// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportChatroom from '../../../app/controller/chatroom';
import ExportFile from '../../../app/controller/file';
import ExportHome from '../../../app/controller/home';
import ExportMessage from '../../../app/controller/message';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    chatroom: ExportChatroom;
    file: ExportFile;
    home: ExportHome;
    message: ExportMessage;
    user: ExportUser;
  }
}
