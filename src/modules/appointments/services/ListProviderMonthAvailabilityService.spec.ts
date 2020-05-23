import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 9, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 10, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 11, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 12, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 13, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 14, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 15, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 16, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 30, 17, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 4, 21, 8, 0, 0),
    })
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { available: false, day: 1 },
        { available: false, day: 2 },
        { available: false, day: 3 },
        { available: false, day: 4 },
        { available: false, day: 5 },
        { available: false, day: 6 },
        { available: false, day: 7 },
        { available: false, day: 8 },
        { available: false, day: 9 },
        { available: false, day: 10 },
        { available: false, day: 11 },
        { available: false, day: 12 },
        { available: false, day: 13 },
        { available: false, day: 14 },
        { available: false, day: 15 },
        { available: false, day: 16 },
        { available: false, day: 17 },
        { available: false, day: 18 },
        { available: false, day: 19 },
        { available: false, day: 20 },
        { available: false, day: 21 },
        { available: false, day: 22 },
        { available: true, day: 23 },
        { available: true, day: 24 },
        { available: true, day: 25 },
        { available: true, day: 26 },
        { available: true, day: 27 },
        { available: true, day: 28 },
        { available: true, day: 29 },
        { available: false, day: 30 },
        { available: true, day: 31 },
      ]),
    )
  })
})
