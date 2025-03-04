
# Community Members App

Aplicação Web de criação de comunidades e membros, na qual permite você gerenciar seus conteúdos para seus membros, possibilitando maior controle e exclusividade:
- Criação de conteúdos na sua comunidade
- Curtidas e comentarios
- Informações sobre todo seu perfil e comunidade

Esta aplicação segue sendo desenvolvida frequentemente única e exclusivamente para incremento de portfolio.

# Funcionamento 

Para rodar na sua máquina:

- crie seu arquivo .env na pasta backend e coloque suas chaves
- execute o comando 'npm i' no diretório backend e frontend no seu terminal
- para rodar o backend, basta digitar no mesmo diretório node index e para o frontend, npm run dev.
- certifique que as portas são 3000 para backend e 5173 para frontend. Caso seja diferente, faça as alterações em 'backend/routes'

Para testar o cartão:
- o numero do cartão é 4242 4242 4242 4242
- o código de segurança pode ser qualquer um
- o vencimento tem que ser acima da data atual

# Screenshoot

Totalmente responsivo: 

![image](https://github.com/user-attachments/assets/eb12dcff-85ad-444b-8e57-d88dc04e0716)

![image](https://github.com/user-attachments/assets/994aa174-e88a-40d5-893a-309b740f155e)

![image](https://github.com/user-attachments/assets/1ad56b37-528c-45c1-bae8-bd60ed8d74ac)

![image](https://github.com/user-attachments/assets/5958870a-8dde-4b6a-ac5c-804aa7f8e85f)

![image](https://github.com/user-attachments/assets/c65a910a-bd4e-49b9-bc71-0f386291067d)

![image](https://github.com/user-attachments/assets/2eae2fa2-601a-465a-9baa-b69a1eb36319)

![image](https://github.com/user-attachments/assets/d78b2ac3-7395-46ee-a8ac-301d444a6b6a)

![image](https://github.com/user-attachments/assets/4049f259-f6e8-4cee-8fcb-5a1bca0a15ae)

![image](https://github.com/user-attachments/assets/fa0c97b1-e18b-4533-8112-be7dffbba499)

![image](https://github.com/user-attachments/assets/dd5b0a2d-21ae-4dda-9bd5-73b6b2d49ec5)

![image](https://github.com/user-attachments/assets/c47c702b-36cb-4986-9c1d-76ef94c85a43)


# Documentação

Dentro de docs, existe o .yml de toda a documentação da API feita utilizando Swagger.io

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

`STRIPE_SECRET_KEY` (secret key do strapi para teste de pagamento via cartão)

## Support

Para suporte, email: vinyby@gmail.com


## Next Updates

- Filtrar por recente e outras opções os modelos de categoria, tipos de post, curtidas e data de postagem

- Recuperação de senha e confirmação de e-mail com nodemailer

- Editar a permanência de sessão utilizando redis, atualmente está com tempo de token pré-definido

- Criação dos métodos de pagamento com Strapi (pelo github education tem benefícios exclusivos, mas posteriormente será feito com API de banco brasileiro para pagamentos via pix)

- Bloqueio de usuários, assim como funciona no X por exemplo
