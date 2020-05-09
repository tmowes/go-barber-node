import { startOfHour, isBefore, getHours } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

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
    )
    if (findAppointmentInSameDate) {
      throw new AppError('Horario já ocupado, escolha outro horario.')
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    })
    return appointment
  }
}
