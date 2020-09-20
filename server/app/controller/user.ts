import { Controller } from 'egg';

export default class UserController extends Controller {
  public async list() {
    const { ctx } = this;
    ctx.successRes(this.app.table.users.findAll());
  }

  public async update() {
    const { ctx, app } = this;
    const { id, name } = ctx.request.body;
    const table = app.table.users;
    const user = table.findOne(id);
    user.name = name;
    table.update(user);
    ctx.successRes();
  }

  public async getUserInfo() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    const user = app.table.users.findOne(id);
    ctx.successRes(user);
  }
}
