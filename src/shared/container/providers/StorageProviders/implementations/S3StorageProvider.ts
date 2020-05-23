import path from 'path'
import fs from 'fs'
import aws, { S3 } from 'aws-sdk'
import uploadConfig from '@config/upload'
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({ region: 'us-east-1' })
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)
    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    })
    this.client
      .putObject({
        Bucket: 'myappgobarber',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise()
    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file)
    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }
    await fs.promises.unlink(filePath)
  }
}
