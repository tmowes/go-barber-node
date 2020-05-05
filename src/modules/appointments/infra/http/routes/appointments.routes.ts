import { Router } from 'express'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded'
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticaded)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find()
//   return response.json(appointments)
// })

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
