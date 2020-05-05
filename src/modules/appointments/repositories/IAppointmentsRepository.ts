import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}

// @EntityRepository(Appointment)
// create(): Promise<Appointment>
// extends Repository<Appointment>
