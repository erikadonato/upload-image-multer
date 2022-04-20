const { Options, diskStorage } = require('multer')
const resolve = require('path')
const randomBytes  = require('crypto')

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', 'tmp'),
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'tmp'))
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename)
        }
        const filename = `${hash.toString('hex')}.png`
        callback(null, filename)
      })
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (request, file, callback) => {
    const formats = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    if (formats.includes(file.mimetype)) {
      callback(null, true)
    }  else {
      callback(new Error('Format not accepted'))
    }
  }
}