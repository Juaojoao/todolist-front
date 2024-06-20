# Olá pessoal! 😁👌

Criar uma aplicação que utilize uma API própria com autenticação, integrando frontend e backend para gerenciar tarefas estilo Trello.

## Requisitos da Aplicação

- 🐘 PostgreSQL: v12 ou superior
- 📗 NodeJS: v20.14 ou superior
- 💉 NPM: v9.5

## Usabilidade

Clone o projeto:

```bash
  git clone https://github.com/Juaojoao/todolist-front.git
  cd todolist-front
```

Instale as dependências:

```bash
  $ npm install
```

#### Configuração do banco.

- 1.  Crie um arquivo .env na pasta api e preencha as informações do banco de dados PostgreSQL:

```bash
  $ DATABASE_URL='postgres://Usuário:Senha@Host:Porta/Schema'
  $ JWT_SECRET=s3cretKey
```

- 2. Execute as migrações do Prisma para configurar o banco (ambiente de desenvolvimento):

```bash
  $ npm run prisma:migrate:dev --name init

```

- 3. Execute as migrações do Prisma para configurar o banco (ambiente de produção)::

```bash
  $ npm run prisma:migrate:deploy
```

#### Rodar a aplicação.

- Ambiente de Desenvolvimento:

```bash
  $ npm run start:dev
```

- Ambiente de produção

- 1. Build da aplicação:

```bash
  $ npm run start:dev
```

- 2. Iniciar aplicação:

```bash
  $ npm run start:prod
```

## Stack utilizada

**Front-end:**

- React
- Redux
- TailwindCSS
- TypeScript
- React Beautiful DND (Drag and Drop)

**Back-end:**

- Node
- NestJS
- PrismaORM
- TypeScript

## Aprendizados

Este projeto me proporcionou valiosos aprendizados, incluindo:

- Integração de frontend e backend utilizando NestJS e React.
- Implementação de autenticação com JWT.
- Utilização de Redux para gerenciamento de estado na aplicação.
- Configuração e uso do Prisma ORM para interação com o banco de dados PostgreSQL.
- Desenvolvimento de interfaces interativas com TailwindCSS e React Beautiful DND.

![alt text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDAzNG43bmp6MGtqbHIycjQxMml6NGE5eHhpbzh3Y2Q1cGwxdm9mMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0GqEkbTfaE5meNNe/giphy.gif)
