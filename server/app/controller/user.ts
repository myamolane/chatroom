import { Controller } from 'egg';

export default class UserController extends Controller {
  public async list() {
    const { ctx } = this;
    ctx.successRes(this.app.table.users.findAll());
  }
}
