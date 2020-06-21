import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

interface IUploadConfig {
  driver: 's3' | 'disk'

  tmpFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
  }

  config: {
    disk: {}
    aws: {
      bucket: string
    }
  }
}

export default {
  tmpFolder,
  uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX')
        const fileName = `${fileHash}-${file.originalname}`
        return callback(null, fileName)
      },
    }),
  },
} as IUploadConfig
