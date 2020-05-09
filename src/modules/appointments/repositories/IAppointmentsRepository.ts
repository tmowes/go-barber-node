import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>
  findAllInDayProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>
}
