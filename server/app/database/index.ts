import users from './users';
import messages from './messages';
import chatrooms from './chatrooms';
import { ITables } from './interface';

export function getDatabase(): ITables {
  return {
    users,
    messages,
    chatrooms,
  }
}

export function initDatabase(app) {
  app.table = {
    users,
    messages,
  }
}
