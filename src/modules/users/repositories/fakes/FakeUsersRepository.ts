import { uuid } from 'uuidv4'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'
import User from '@modules/users/infra/typeorm/entities/User'

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findById(id: string): Promise<User | undefined> {
    const userId = this.users.find((user) => user.id === id)
    return userId
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = this.users.find((user) => user.email === email)
    return userEmail
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this
    if (except_user_id) {
      users = this.users.filter((user) => user.id !== except_user_id)
    }
    return users
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { id: uuid(), name, email, password })
    this.users.push(user)
    return user
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    )
    this.users[userIndex] = user
    return user
  }
}
