# Recuperação de senha

**RF**

- O Usuario deve poder recuperar sua senha usando seu email
- O Usuario deve receber um email com instruções de recuperação de senha

**RNF**

- Utilizar MailTrap para testar envio de email em desenvolvimento.
- Utilizar o Amazon SES para enviar email em produção.
- O envio de email deve acontecer em segundo plano(background job).

**RN**

- Identificar usuario com token para validar a operação de resetar a senha
- O link enviado por email para resetar a senha, deve expirar em 2hrs
- Ao resetar a senha o usuario precisa confirmar a senha

# Atualização do perfil

**RF**

- O Usuario deve poder atualizar seu perfil.

**RNF**

**RN**

- O Usuario não pode alterar seu email para um email já cadastrado
- Ao atualizar a senha o usuario precisa informar a senha antiga
- Ao atualizar a senha o usuario precisa confirmar a senha

# Painel do presatador

**RF**

- O Usuario deve poder listar os agendamentos de um dia especifico.
- O Prestador deve receber notificação sempre que houver um novo agendamentos
- O Prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenada em cache
- As notificação do prestador devem ser armazenada no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real com Socket.IO

**RN**

- A notificação deve ter um status de lida/não lida

# Agendamento de serviço

**RF**

- O Usuario deve poder listar todos presatadores de serviço cadastrados.
- O Usuario deve poder listar os dias com pelo menos um horario disponivel de um prestador.
- O Usuario deve poder listar horario disponiveis em um dia especifico de um prestador.
- O Usuario deve poder realizar um novo agendamento com um prestador.

**RNF**

- A listagem de presatadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente.
- Os agendamentos devem estar disponiveis entre 8h e 18h (último 17h).
- O Usuario não pode agendar em um horario já ocupado.
- O Usuario não pode agendar em um horario que já passou.
- O Usuario não pode agendar serviços consigo mesmo.
