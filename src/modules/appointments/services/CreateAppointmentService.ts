import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProviders/models/ICacheProvider'

interface IRequestDTO {
  provider_id: string
  user_id: string
  date: Date
}
@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(`You can't create a appointment on past date`)
    }
    if (user_id === provider_id) {
      throw new AppError(
        `You can't create a appointment with yourself as provider`,
      )
    }
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        `You can only create a appointment between 8am and 5pm`,
      )
    }
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    )
    if (findAppointmentInSameDate) {
      throw new AppError('Horário já ocupado, escolha outro horário.')
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    })
    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm 'h'")
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Um novo agendamento para dia ${dateFormatted}`,
    })
    const cacheKey = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`
    await this.cacheProvider.invalidatePrefix(cacheKey)
    return appointment
  }
}
