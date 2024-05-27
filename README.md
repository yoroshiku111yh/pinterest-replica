
# Replica Pinterest

- A project code by Nestjs (Backend) and Nextjs (Frontend) 
- For course backend Nodejs by Framework Nestjs, upgrade with Frontend Nextjs


## IMPORTANT
### IF YOU ARE USING YARN V1 PLEASE RUN yarn add sharp --ignore-engines after yarn add TO REINSTALL sharp package when got error Could not load Sharp

## Backend
- /backend
- Backend :  yarn start:dev
- Port : 8080
- Api list ( Swagger ) : http://localhost:8080/swagger/

## Frontend
- /front-end
- Frontend : yarn dev
- Port : 3000
- ( check image id 49 for comment load scroll : http://localhost:3000/image/49 )
## Database
- /database/option-sql
- Port : 3306 ( .env )
- table name ( using in .env ) : pinterest_capstone_41

## Tools
#### Frontend
- React hook form
- Typescript
- Tailwind css
- lodash
- Nextjs

#### Backend
- Nestjs
- JWT Passport
- Typescript

## Ideal for performance 
### Backend 
- use guard to check permission
- use interceptors for get token decode from url is not require token ( example : home page if logged in will get data interact of token user for each image )
- use pipe compress image 
- check JWT 
- keys pair token ( access - refresh ) to avoid leaked old access token still valid

### Frontend
- use debounce (lodash) to avoid spam request api ( from scroll/typing )
- use compose pattern to split large component
- use react hook form to simple way validate and submit data
- use custom hooks to reusable logic code
## Requirements
- Node : version > 20
