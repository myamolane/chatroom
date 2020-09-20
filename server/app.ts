// import { initDatabase } from './app/database';
import * as SocketIO from 'socket.io';
import { ITables } from './app/database/interface';
import { initSocket } from './socket';

class AppBootHook {
  app:any = null;

  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    // initDatabase(this.app);
    initSocket(this.app);
  }
}

declare module 'egg' {

  interface Application {
    socket: SocketIO.Server;
    table: ITables;
  }

}

module.exports = AppBootHook;
