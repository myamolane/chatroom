import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.post('/api/file/upload', controller.file.upload)
  router.get('/api/file/upload', controller.home.index)

  router.get('/api/chatroom/messages', controller.chatroom.messagees)
  router.get('/api/chatroom/users', controller.chatroom.users)

  router.get('/api/users/', controller.user.list)
  router.put('/api/users/', controller.user.update)
};
