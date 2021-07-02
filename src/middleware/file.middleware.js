const path = require('path')
const multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')
const Jimp = require('jimp')

// 处理文件上传
const avatarUpload = multer({
  // 存放的目标文件夹
  dest: AVATAR_PATH,
})

const avatarHandler = avatarUpload.single('avatar')

// 处理文件上传
const pictureUpload = multer({
  // 存放的目标文件夹
  dest: PICTURE_PATH,
})

const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  // 获取所有图像数据
  const files = ctx.req.files
  console.log(files)

  // 对图像进行处理(jimp)s
  try {
    for (let file of files) {
      const destPath = path.join(file.destination, file.filename)
      Jimp.read(file.path).then(image => {
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
      })
    }
  } catch (error) {
    console.log(error)
  }

  await next()
}

module.exports = { avatarHandler, pictureHandler, pictureResize }
