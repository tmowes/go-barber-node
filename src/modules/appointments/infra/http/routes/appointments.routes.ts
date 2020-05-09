import { Router } from 'express'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded'
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticaded)

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
