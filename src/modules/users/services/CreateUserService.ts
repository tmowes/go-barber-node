import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/providers/CacheProviders/models/ICacheProvider'

interface IRequestDTO {
  name: string
  email: string
  password: string
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const findUserInSameEmail = await this.usersRepository.findByEmail(email)
    if (findUserInSameEmail) {
      throw new AppError('Email já cadastrado.')
    }
    const hashedPassword = await this.hashProvider.generateHash(password)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    await this.cacheProvider.invalidatePrefix(`providers-list`)
    return user
  }
}
