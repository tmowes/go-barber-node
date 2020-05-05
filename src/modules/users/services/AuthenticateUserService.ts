import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequestDTO {
  email: string
  password: string
}

interface IResponseDTO {
  user: User
  token: string
}
@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Email ou senha invalidos.', 401)
    }
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new AppError('Email ou senha invalidos.', 401)
    }

    // Usuario autenticado sign ({payload},'key', {configs})
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}
