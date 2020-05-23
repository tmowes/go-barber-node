import { inject, injectable } from 'tsyringe'
import { getDaysInMonth, getDate, isAfter } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  month: number
  year: number
}

type IResponseDTO = { day: number; available: boolean }[]

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    )
    const numberOdDaysInMonth = getDaysInMonth(new Date(year, month - 1))
    const eachDayArray = Array.from(
      {
        length: numberOdDaysInMonth,
      },
      (_, index) => index + 1,
    )
    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day
      })
      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      }
    })
    return availability
  }
}
