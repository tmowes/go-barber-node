import { getMongoRepository, MongoRepository } from 'typeorm'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotification from '@modules/notifications/dtos/ICreateNotification'
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    recipient_id,
    content,
  }: ICreateNotification): Promise<Notification> {
    const notification = this.ormRepository.create({
      recipient_id,
      content,
    })
    await this.ormRepository.save(notification)
    return notification
  }
}
