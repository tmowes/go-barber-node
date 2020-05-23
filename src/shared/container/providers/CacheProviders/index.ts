import { container } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProviders/models/ICacheProvider'
import RedisCacheProvider from '@shared/container/providers/CacheProviders/implementations/RedisCacheProvider'

const providers = {
  redis: RedisCacheProvider,
}
container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis)
