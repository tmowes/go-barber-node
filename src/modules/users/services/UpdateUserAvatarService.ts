import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/providers/StorageProviders/models/IStorageProvider'

interface IRequestDTO {
  user_id: string
  avatarFilename: string
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError(
        'Somente usuarios autenticados podem trocar avatar',
        401,
      )
    }
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }
    await this.storageProvider.saveFile(avatarFilename)
    user.avatar = avatarFilename
    await this.usersRepository.save(user)
    return user
  }
}
