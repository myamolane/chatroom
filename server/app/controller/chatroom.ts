import { Controller } from 'egg';

export default class ChatroomController extends Controller {
  private async getChatroom(chatroomId) {
    return this.app.table.chatrooms.findOne(chatroomId);
  }

  public async messagees() {
    const { ctx } = this;
    const { chatroomId = 'default' } = ctx.query;

    const chatroom = await this.getChatroom(chatroomId);
    const userMap = await this.getUserMap();
    const messages = chatroom.messages.map(message => {
      return {
        ...message,
        userName: userMap[message.user].name,
      };
    });
    ctx.successRes(messages);
  }

  public async users() {
    const { ctx } = this;
    const { chatroomId = 'default' } = ctx.query;

    const chatroom = await this.getChatroom(chatroomId);

    const userMap = await this.getUserMap();
    const users = chatroom.users.map(id => userMap[id]).filter(user => user);
    ctx.successRes(users);
  }

  private async getUserMap() {
    const users = this.app.table.users.findAll();
    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user;
    });
    return userMap;
  }
}
