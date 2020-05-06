/* eslint-disable no-console */
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

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
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const findUserInSameEmail = await this.usersRepository.findByEmail(email)
    if (findUserInSameEmail) {
      throw new AppError('Email já cadastrado.')
    }
    console.log('hashProviderhashProviderhashProvider', this.hashProvider)
    const hashedPassword = await this.hashProvider.generateHash(password)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    return user
  }
}
