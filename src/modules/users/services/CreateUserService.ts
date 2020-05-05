import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

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
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const findUserInSameEmail = await this.usersRepository.findByEmail(email)
    if (findUserInSameEmail) {
      throw new AppError('Email já cadastrado.')
    }
    const hashedPassword = await hash(password, 8)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    return user
  }
}
