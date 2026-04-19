# 🎫 Sistema de Gestão de Tickets (HelpDesk)
👨‍💻 Autor
Danilo de Souza – Desenvolvedor Full Stack

<p align="center">
  <img src="https://img.shields.io/badge/Status-Online-green?style=for-the-badge" alt="Status Online">
  <img src="https://img.shields.io/badge/Maintained%3F-yes-blue?style=for-the-badge" alt="Maintained">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License MIT">
</p>

> **Uma plataforma completa para abertura e gerenciamento de chamados**, desenvolvida para facilitar a comunicação estratégica entre clientes e administradores.

⚙️ Como rodar o projeto localmente

git clone [https://github.com/domicianofullstack/sistema-tickets.git](https://github.com/domicianofullstack/sistema-tickets.git)

Instale as dependências:
npm install

Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto e preencha:
DB_HOST=seu_host_aiven
DB_USER=avnadmin
DB_PASSWORD=sua_senha
DB_NAME=defaultdb
DB_PORT=15921
EMAIL_USER=seu_email@domiciano.shop
EMAIL_PASS=sua_senha_smtp

Inicie o servidor:
npm start
Acesse: http://localhost:3000

---

## 🚀 Link do Projeto
O projeto está publicado e pronto para teste!
**Acesse aqui:** [sistema-tickets.onrender.com/login](https://sistema-tickets-7exl.onrender.com/login)

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as melhores práticas de desenvolvimento Full Stack:

* **Backend:** `Node.js` com framework `Express`
* **Banco de Dados:** `MySQL` (Hospedado via Aiven Cloud)
* **Frontend:** `EJS` (Embedded JavaScript templates), `CSS3` e `JavaScript`
* **Autenticação:** `Sessões` e `Bcrypt` para hashing de senhas
* **E-mail:** Integração com SMTP via `KingHost` (NodeMailer)
* **Uploads:** `Multer` para gerenciamento dinâmico de anexos
* **Deploy:** `Render.com` com certificado `SSL/CA`

---

## ✨ Funcionalidades Principais

### 👤 Área do Cliente
* **Cadastro e Login:** Sistema seguro com proteção de dados.
* **Abertura de Tickets:** Envio de descrição, prioridade e suporte a até **3 anexos** de imagem.
* **Acompanhamento:** Visualização de respostas e histórico completo em tempo real.
* **Calendário:** Organização visual intuitiva de tickets e prazos.

### 🛡️ Painel Administrativo
* **Gestão Total:** Visualização centralizada de todos os chamados da plataforma.
* **Controle de Status:** Fluxo de trabalho (Aberto, Em Progresso, Resolvido, Fechado).
* **Interação Direta:** Chat direto para suporte ágil ao cliente.
* **Notificações Automáticas:** Disparo de e-mails sobre novas interações.
* **Gestão de Usuários:** Interface administrativa para controle de acessos.

---

## 📦 Estrutura de Pastas

```bash
├── src/
│   ├── config/       # Configurações de conexão (db.js)
│   └── ...           # Controladores e rotas
├── views/            # Templates EJS (Interface do usuário)
├── public/           # Arquivos estáticos (CSS, JS, Uploads)
├── server.js         # Entry point (Servidor Express)
├── emailService.js   # Integração SMTP
└── ca.pem            # Certificado SSL para Banco de Dados