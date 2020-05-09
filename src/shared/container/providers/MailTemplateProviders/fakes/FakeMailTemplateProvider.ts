import IMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/models/IMailTemplateProvider'

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Template Fake'
  }
}
