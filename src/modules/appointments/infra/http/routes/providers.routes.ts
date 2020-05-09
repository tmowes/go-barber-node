import { Router } from 'express'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'

const providersRouter = Router()
const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

providersRouter.use(ensureAuthenticaded)

providersRouter.get('/', providersController.index)
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
)
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
)

export default providersRouter

// localhost/providers/:id/month-availability
// localhost/providers/:id/day-availability
