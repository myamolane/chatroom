import { Controller } from 'egg';
import { v4 as uuidV4 } from 'uuid';

export default class UserController extends Controller {
  public async list() {
    const { ctx } = this;
    ctx.successRes(this.app.table.users.findAll());
  }

  public async login() {
    const { ctx, app } = this;
    let id = ctx.cookies['session'];
    if (!id) {
      id = uuidV4();
      app.table.users.add({ id });
    }
    const user = app.table.users.findOne(id);
    ctx.response.headers['Set-Cookie'] = `session=${id}`;
    ctx.successRes({
      code: 0,
      data: user,
    })
  }

  public async update() {
    const { ctx, app } = this;
    const { id, name } = ctx.request.body;
    const user = app.table.users.findOne(id);
    user.name = name;
    ctx.successRes();
  }
}
