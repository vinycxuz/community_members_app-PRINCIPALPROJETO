
# Community Members App

Aplicação Web de criação de comunidades e membros, na qual permite você gerenciar seus conteúdos para seus membros, possibilitando maior controle e exclusividade:
- Criação de conteúdos na sua comunidade
- Personalização de mensalidades e membros
- Curtidas e comentarios
- Informações sobre todo seu perfil e comunidade

Esta aplicação segue sendo desenvolvida frequentemente única e exclusivamente para incremento de portfolio.



## Tech Stack

Backend:

**Database:** MongoDb, Redis

**Servidor:** Node.js, Express

**Bibliotecas e frameworks**: bcrypt, cookie-parser, dotenv, helmet, jsonwebtoken, mongoose

Frontend:

**Linguagem:** JavaScript

**Bibliotecas e frameworks**: React, TailwindCSS, Redux, Yup, Axios, React Query, Formik





## Environment Variables

Para rodar esse projeto, irá precisar criar um arquivo .env para:

`STRING_CONNECTION` (string conexão do mongodb)

`JWT_SECRET` (para configuração de token)

`GOOGLE_CLIENT_ID` (id da api de login do Google)

`GOOGLE_CLIENT_SECRET` (chave da api de login com o google)


## Support

Para suporte, email: vinyby@gmail.com


## Next Updates

- Filtrar por recente e outras opções os modelos de categoria, tipos de post, curtidas e data de postagem

- Recuperação de senha e confirmação de e-mail com nodemailer

- Editar a permanência de sessão utilizando redis, atualmente está com tempo de token pré-definido

- Criação dos métodos de pagamento com Strapi (pelo github education tem benefícios exclusivos, mas posteriormente será feito com API de banco brasileiro para pagamentos via pix)

- Bloqueio de usuários, assim como funciona no X por exemplo
