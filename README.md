# API Gestão Tributária Municipal

API REST desenvolvida para estudos práticos de backend voltados à gestão tributária municipal.

O projeto simula funcionalidades comuns de sistemas públicos e corporativos, com foco em autenticação JWT, controle de acesso, integração com PostgreSQL e documentação de APIs.

---

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Supabase
- JWT (JSON Web Token)
- Bcrypt
- Swagger / OpenAPI
- Thunder Client / Postman

---

## Funcionalidades

### Gestão de Contribuintes

- Cadastro de contribuintes
- Listagem de contribuintes ativos
- Busca por ID
- Atualização de cadastro
- Exclusão lógica (`ativo = false`)
- Paginação de resultados

### Autenticação e Segurança

- Login com JWT
- Middleware de autenticação
- Proteção de rotas
- Controle de acesso por perfil (ADMIN)
- Hash de senha com Bcrypt
- Tratamento de erros com try/catch

### Documentação

- Swagger/OpenAPI
- Testes integrados via Swagger UI

---

## API Online

🔗 https://api-gestao-tributaria-municipal-production.up.railway.app

---

## Swagger Online

📄 https://api-gestao-tributaria-municipal-production.up.railway.app/api-docs

---

## Estrutura do Projeto

```bash
src/
├── config/
├── middleware/
├── routes/
├── services/
```

---

## Instalação

```bash
git clone https://github.com/williamaquino92/api-gestao-tributaria-municipal.git
```

```bash
cd api-gestao-tributaria-municipal
```

```bash
npm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=sua_url
SUPABASE_KEY=sua_key
JWT_SECRET=sua_chave_jwt
```

---

## Executando o Projeto

```bash
npm run dev
```

Servidor local:

```txt
http://localhost:3000
```

---

## Documentação Swagger

```txt
http://localhost:3000/api-docs
```

---

## Exemplo de Login

### POST `/auth/login`

```json
{
  "email": "admin@prefeitura.com",
  "senha": "123"
}
```

---

## Autenticação Bearer

Adicionar no Header:

```txt
Authorization: Bearer SEU_TOKEN
```

---

## Conceitos Praticados

Durante o desenvolvimento foram praticados conceitos importantes de backend:

- APIs REST
- Estruturação de rotas
- Middlewares
- JWT
- Hash de senha
- Controle de acesso (RBAC)
- Integração com PostgreSQL
- Supabase
- Debugging
- Deploy em produção
- Git e GitHub
- Swagger/OpenAPI
- Tratamento de erros
- Versionamento

---

## Próximos Passos

- Frontend integrado
- Docker
- Logs de auditoria
- Refresh Token
- CI/CD
- Testes automatizados

---

## Swagger

![Swagger](./assets/swagger.png)

---

## Login

![Login](./assets/swagger-autenticacao.png)

---

## GET Contribuintes

![GET](./assets/swagger-contribuintes.png)

---

## Autor

William Aquino

LinkedIn:  
https://www.linkedin.com/in/williamaquino92/