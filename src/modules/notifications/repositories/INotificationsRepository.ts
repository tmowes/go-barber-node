import ICreateNotification from '@modules/notifications/dtos/ICreateNotification'
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'

export default interface INotificationsRepository {
  create(data: ICreateNotification): Promise<Notification>
}
