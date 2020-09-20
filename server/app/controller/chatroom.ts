import { Controller } from 'egg';

export default class ChatroomController extends Controller {
  public async messagees() {
    const { ctx } = this;
    ctx.successRes(this.app.table.messages.findAll());
  }
}
