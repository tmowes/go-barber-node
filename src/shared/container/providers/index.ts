/* eslint-disable @typescript-eslint/no-unused-vars */
import { container } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider'
import EtherealMailProvider from '@shared/container/providers/MailProviders/implementations/EtherealMailProvider'
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/implementations/HandlebarsMailTemplateProvider'
import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider'
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/models/IMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
)
