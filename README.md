## typeScript ecommerce

1. create typeScript React App with vite
2. create git repository and connect vs to github
3. list Products
   1. create product types
   2. create products array
   3. add product images
   4. render product 
4. import Bootstrap
5. create Navbar with Bootstrap
6. add page routing system and add pages and component

#  create backend folder and run "npm init -y"
    1. config typeScript in backend : 
        - create tsconfig.json
        - npm install --save-dev typescript ts-node-dev
        - add  basic configuration to tsconfig.json
   2. config eslint :
            1. npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin 
            2. create .eslintrc.js
            3. create .gitignore and add : 
              /node_modules
              /build
               #system files
               .DS_Store
                Thumbs.db
   3. create express server:
            - install it : npm install express
            install its type: npm install --save-sev @types/express
   4. create src/index.ts
        - copy data.ts and product.ts from frontend to backend
        - Copy paste data and type folder from frontend inside src in backend
        - import sampleProducts from data in index.ts
   5. Running TypeScript Using ts-node-dev or ts-node + nodemon:
      1. ts-node + nodemon:
         - install dependencies : npm install --save-dev ts-node typescript

         - install nodemone : npm install --save-dev nodemon
         - Create a start or dev script in your package.json:
         "scripts": {
           "start": "nodemon -r ts-node/register src/index.ts"
            }
         - npm start or npm run dev

        2. ts-node-dev (this is faster)
           - npm install --save-dev ts-node-dev typescript
           - "scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc"
}
            - npm run build (to create a new folder name build and all ts files converted to js file inside it)
            -npm run dev


# fetch product:
   1. install axios in frontend : npm install axios

   2. import axios in main and 
   3. use this code in main:
 axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/';

  4. for processing we need to install types node, run this command in terminal:
npm i --save-dev @types/node

   5. define types in homepage:
   6. define initial state and reducer in HomePage.tsx
   7. define get error function:
      - inside types folder (in frontend) create ApiError.ts and declare type of ApiError inside it 
   8. create utils.ts in (frontend>src) and create getError function inside it
   9. fetch 
   10. replace sampleProducts with products


# creating rating:
  1. 

# creat page title in react app:
using react-helmet-async
 1. install it in frontend:  npm install react helmet async and wrap app with <HelmetProvider>

 # using rect query to manage async states and getting data from backend
 1. we need to install two packages:
 in frontend :  npm i @tanstack/react-query
 install a dev tools for react query for finding issues an debugging codes: 
 npm i @tanstack/react-query-devtools
 2. implementing api call with rect query:
 3. in frontend>src create apiClient.ts
 4. creating hooks

 # product page :
 1. create product api in the backend index.ts

# creating react context
 1. in frontend>src create Store.ts
 


# ecommerce
