import { Router } from 'express'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded'
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticaded)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter
