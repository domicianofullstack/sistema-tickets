🎫 Sistema de Gestão de Tickets (HelpDesk)
Uma plataforma completa para abertura e gerenciamento de chamados, desenvolvida para facilitar a comunicação entre clientes e administradores.

🚀 O projeto está online! Confira aqui: sistema-tickets.onrender.com/login

🛠️ Tecnologias Utilizadas
Backend: Node.js com Express

Banco de Dados: MySQL (Hospedado via Aiven Cloud)

Frontend: EJS (Embedded JavaScript templates), CSS3 e JavaScript

Autenticação: Sessões e Bcrypt para hashing de senhas

E-mail: Integração com SMTP via KingHost (NodeMailer)

Uploads: Multer para gerenciamento de anexos

Deploy: Render.com (com certificado SSL/CA)

✨ Funcionalidades
👤 Área do Cliente
Cadastro e Login: Sistema seguro com senhas criptografadas via Bcrypt.

Abertura de Tickets: Envio de descrição, prioridade e suporte a até 3 anexos de imagem.

Acompanhamento: Visualização de respostas e histórico completo de mensagens por chamado.

Calendário: Organização visual de tickets e prazos.

🛡️ Painel Administrativo
Gestão Total: Visualização centralizada de todos os chamados da plataforma.

Controle de Status: Gestão do fluxo de trabalho (Aberto, Em Progresso, Resolvido, Fechado).

Interação Direta: Chat em tempo real para suporte ao cliente.

Notificações: Disparo automático de e-mails informando interações no ticket.

Gestão de Usuários: Interface para criação e controle de novos acessos administrativos ou de clientes.🎫 Sistema de Gestão de Tickets (HelpDesk)
Uma plataforma completa para abertura e gerenciamento de chamados, desenvolvida para facilitar a comunicação entre clientes e administradores.

🚀 O projeto está online! Confira aqui: sistema-tickets.onrender.com/login

🛠️ Tecnologias Utilizadas
Backend: Node.js com Express

Banco de Dados: MySQL (Hospedado via Aiven Cloud)

Frontend: EJS (Embedded JavaScript templates), CSS3 e JavaScript

Autenticação: Sessões e Bcrypt para hashing de senhas

E-mail: Integração com SMTP via KingHost (NodeMailer)

Uploads: Multer para gerenciamento de anexos

Deploy: Render.com (com certificado SSL/CA)

✨ Funcionalidades
👤 Área do Cliente
Cadastro e Login: Sistema seguro com senhas criptografadas via Bcrypt.

Abertura de Tickets: Envio de descrição, prioridade e suporte a até 3 anexos de imagem.

Acompanhamento: Visualização de respostas e histórico completo de mensagens por chamado.

Calendário: Organização visual de tickets e prazos.

🛡️ Painel Administrativo
Gestão Total: Visualização centralizada de todos os chamados da plataforma.

Controle de Status: Gestão do fluxo de trabalho (Aberto, Em Progresso, Resolvido, Fechado).

Interação Direta: Chat em tempo real para suporte ao cliente.

Notificações: Disparo automático de e-mails informando interações no ticket.

Gestão de Usuários: Interface para criação e controle de novos acessos administrativos ou de clientes.

🚀 Como rodar o projeto localmente
Clone o repositório:

Bash
git clone https://github.com/seu-usuario/seu-repositorio.git
Instale as dependências:

Bash
npm install
Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto e preencha com suas credenciais:

Code snippet
DB_HOST=seu_host_aiven
DB_USER=avnadmin
DB_PASSWORD=sua_senha
DB_NAME=defaultdb
DB_PORT=15921
EMAIL_USER=seu_email@domiciano.shop
EMAIL_PASS=sua_senha_smtp
Inicie o servidor:

Bash
npm start
Acesse: http://localhost:3000

📦 Estrutura de Pastas
Plaintext
├── src/
│   ├── config/      # Configurações de conexão (db.js)
│   └── ...          # Controladores e rotas
├── views/           # Templates EJS (Interface do usuário)
├── public/          # Arquivos estáticos (CSS, JS, Uploads de imagens)
├── server.js        # Entry point da aplicação (Servidor Express)
├── emailService.js  # Serviço de integração com o servidor SMTP
└── ca.pem           # Certificado SSL para conexão segura com banco de dados
👨‍💻 Autor
Danilo de Souza – Desenvolvedor Full Stack

Portfólio: https://www.domiciano.shop