import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController'
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'

const appointmentsRouter = Router()
const providerAppointmentsController = new ProviderAppointmentsController()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
      // date: Joi.date().timestamp().raw(),
    }),
  }),
  appointmentsController.create,
)

appointmentsRouter.get('/schedule', providerAppointmentsController.index)

export default appointmentsRouter
