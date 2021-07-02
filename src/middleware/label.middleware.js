const service = require('../service/label.service')

// 验证标签是否存在
const verifyLabelExists = async (ctx, next) => {
  // 获取数据
  const { labels } = ctx.request.body

  // 判断标签是否在label中存在
  const newLabels = []
  for (let name of labels) {
    // 查询标签
    const labelResult = await service.getLabelByName(name)
    // 添加name属性
    const label = { name }
    if (!labelResult) {
      // 创建标签
      const result = await service.create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }
    newLabels.push(label)
  }
  console.log(newLabels)
  ctx.labels = newLabels
  await next()
}

module.exports = { verifyLabelExists }
