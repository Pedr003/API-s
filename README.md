# APIs

Projeto contendo múltiplas APIs organizadas por categoria, geralmente acompanhadas de aplicações HTML.

---

## API de Usuários

API REST para gerenciamento de usuários.

  
  ### Tecnologias
  - Node.js
  - Express
  - Prisma
  - SQLite

  ### Instalação servidor
    
  ```bash
  git clone <repo>
  cd server
  npm install
  ```

  Crie um arquivo chamado **.env**, escreva nele:
  ```bash
  DATABASE_URL="file:./dev.db"
  ```

  Criar e conectar banco de dados:
  ```bash
  npx prisma generate
  npx prisma db push
  ```

  Iniciar servidor:
  ```bash
  node server.js
  ```
  Servidor rodando na porta 3000
  
  ### Instalação frontend
  ```bash
  npm install
  npm run dev
  ```
  

  ### Funcionalidades
  | Método | Rota       | Descrição             |
  |--------|------------|-----------------------|
  | GET    | /users     | Lista usuários        |
  | POST   | /users     | Cria usuário          |
  | PUT    | /users/:id | Atualiza usuário      |
  | DELETE | /users/:id | Remove usuário        |

  ### Aplicação HTML
  > 🚧 Em desenvolvimento

---

> 🚧 Projeto em desenvolvimento
<!-- > 🚧 Nova API em breve -->
