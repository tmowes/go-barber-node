import { uuid } from 'uuidv4'
import { isEqual } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    )
    return findAppointment
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment()
    Object.assign(appointment, { id: uuid(), provider_id, date })
    this.appointments.push(appointment)
    return appointment
  }
}
