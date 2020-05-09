/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'
import { getDaysInMonth, getDate } from 'date-fns'

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
    const appointments = await this.appointmentsRepository.findAllInMonthProvider(
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
    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day
      })
      return { day, available: appointmentsInDay.length < 10 }
    })
    return availability
    // const availability = [{ day: 1, available: false }]
    // return availability
  }
}
