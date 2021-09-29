const fs = require('fs');
const MomentService = require('../service/moment.service');
const fileService = require('../service/file.service');
const { PICTURE_PATH } = require('../constants/file-path');

class MomentController {
  // 文章动态
  async create(ctx, next) {
    // 获取数据(user_id, content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 插入数据
    const result = await MomentService.create(userId, content);
    ctx.body = result;
  }

  // 文章查询
  async detail(ctx, next) {
    // 获取数据
    const momentId = ctx.params.momentId;

    // 根据momentId查询数据
    const result = await MomentService.getMomentById(momentId);
    ctx.body = result;
  }

  // 文章查询多条
  async list(ctx, next) {
    // 获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 查询列表
    const result = await MomentService.getMomentList(offset, size);
    ctx.body = result;
  }

  // 修改文章内容
  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const { id } = ctx.user;

    // 修改内容
    const result = await MomentService.updateMoment(content, momentId);
    ctx.body = result;
  }

  // 删除文章
  async remove(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;

    // 删除内容
    const result = await MomentService.removeMoment(momentId);
    ctx.body = result;
  }

  // 动态添加标签
  async addlabels(ctx, next) {
    // 获取参数
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 添加标签
    for (let label of labels) {
      // 判断标签是否和动态有关系
      const isExist = await MomentService.hasLabel(momentId, label.id);

      if (!isExist) {
        // 不存在就添加
        await MomentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = '动态添加标签成功~';
  }

  async fileInfo(ctx, next) {
    const { filename } = ctx.params;
    const [fileInfo] = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ['small', 'middle', 'large'];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
