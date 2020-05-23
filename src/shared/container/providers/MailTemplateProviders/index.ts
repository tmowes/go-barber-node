import { container } from 'tsyringe'

import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/implementations/HandlebarsMailTemplateProvider'
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/models/IMailTemplateProvider'

const providers = {
  handlebars: container.resolve(HandlebarsMailTemplateProvider),
}
container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
