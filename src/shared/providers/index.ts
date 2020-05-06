import { container } from 'tsyringe'

import IStorageProvider from '@shared/providers/StorageProviders/models/IStorageProvider'
import DiskStorageProvider from '@shared/providers/StorageProviders/implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)
