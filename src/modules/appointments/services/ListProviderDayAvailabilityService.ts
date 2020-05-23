import { inject, injectable } from 'tsyringe'
import { getHours, isAfter } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponseDTO = { hour: number; available: boolean }[]

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    )
    const hourStart = 8
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    )
    const currentDate = new Date(Date.now())
    const availability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      )
      const compareDate = new Date(year, month - 1, day, hour)
      return {
        hour,
        available: !hasAppointmentsInHour && isAfter(compareDate, currentDate),
      }
    })
    return availability
  }
}
