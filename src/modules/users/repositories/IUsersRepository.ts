import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO'

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUsersDTO): Promise<User>
  save(user: User): Promise<User>
}
