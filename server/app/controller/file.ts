import { Controller } from 'egg';
import * as path from 'path';
import * as awaitStream from 'await-stream-ready';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import { v4 as uuidV4 } from 'uuid';

export default class FileController extends Controller {
  public async upload(ctx) {
    const stream = await ctx.getFileStream();
    const filename = `${uuidV4()}-${stream.filename}`;
    const directory = path.join(__dirname, '../public');
    await mkdirp(directory);
    let filePath = path.join(directory, filename);

    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    await awaitStream.write(stream.pipe(upStream));
    
    ctx.body = {
      code: 0,
      data: `public/${filename}`
    }
  }
}
