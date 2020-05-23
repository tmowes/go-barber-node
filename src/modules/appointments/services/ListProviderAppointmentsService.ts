import { inject, injectable } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProviders/models/ICacheProvider'
import { classToClass } from 'class-transformer'

interface IRequestDTO {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${day}-${month}-${year}`
    let appointments = await this.cacheProvider.recover<Appointment[]>(
      'cacheKey',
    )
    // let appointments
    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          day,
          month,
          year,
        },
      )
      await this.cacheProvider.save(cacheKey, classToClass(appointments))
    }
    return appointments
  }
}
