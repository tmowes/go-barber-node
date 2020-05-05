import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded'
import UsersController from '@modules/users/infra/http/controllers/UsersController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

usersRouter.post('/', usersController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  userAvatarController.update,
)

export default usersRouter
