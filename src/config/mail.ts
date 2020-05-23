interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: { email: string; name: string }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: { email: 'teste@tmowes.dev', name: 'Julio Cesar Mowes' },
  },
} as IMailConfig
