import { ObjectID } from 'mongodb'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotification from '@modules/notifications/dtos/ICreateNotification'
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'

export default class NotificationsRepository
  implements INotificationsRepository {
  private notifications: Notification[] = []

  public async create({
    recipient_id,
    content,
  }: ICreateNotification): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, { id: new ObjectID(), recipient_id, content })

    this.notifications.push(notification)
    return notification
  }
}
