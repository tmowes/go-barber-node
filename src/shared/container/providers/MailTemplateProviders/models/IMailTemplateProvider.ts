import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProviders/dtos/IParseMailTemplateDTO'

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}
