import { Controller } from 'egg';

export default class ChatroomController extends Controller {
  private async getChatroom(chatroomId) {
    return this.app.table.chatrooms.findOne(chatroomId);
  }

  public async messagees() {
    const { ctx } = this;
    const { chatroomId = 'default' } = ctx.query;

    const chatroom = await this.getChatroom(chatroomId);
    ctx.successRes(chatroom.messages);
  }

  public async users() {
    const { ctx } = this;
    const { chatroomId = 'default' } = ctx.query;

    const chatroom = await this.getChatroom(chatroomId);
    ctx.successRes(chatroom.users);
  }
}
