import users from './users';
import messages from './messages';
import { ITables } from './interface';

export function getDatabase(): ITables {
  return {
    users,
    messages,
  }
}

export function initDatabase(app) {
  app.table = {
    users,
    messages,
  }
}
