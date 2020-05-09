/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'
import { differenceInHours } from 'date-fns'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequestDTO {
  token: string
  password: string
}
@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('User token not found')
    }
    const user = await this.usersRepository.findById(userToken.user_id)
    if (!user) {
      throw new AppError('User not found')
    }
    const tokenCreatedAt = userToken.created_at
    const diff = differenceInHours(Date.now(), tokenCreatedAt.getTime())

    if (diff > 2) {
      throw new AppError('Token expired')
    }
    user.password = await this.hashProvider.generateHash(password)
    await this.usersRepository.save(user)
  }
}
