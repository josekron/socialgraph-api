### Description

I noticed that you can only find the same basic examples on the internet when you search for graphQL or PostgreSQL, and you can even forget to find something with both technologies running together. 

Therefore, I created this repository with the purpose of having a **full backend application (almost) ready for production, using some of the most in-demand technologies** such as **GraphQL** and **PostgreSQL**, and everything running on **Docker-compose**. 

## Technologies

- Express + Typescript
- GraphQL
- PostgreSQL + ORM Sequelize
- Call an external API with fetch
- Jest + Supertest for the tests
- Docker-compose to run the app and the database

> **Note:** `vitest` has an [unsolved issue](https://github.com/vitejs/vite/issues/7879) with `express` + `supertest-graphql`. Therefore, I replaced vitest with Jest.

## How to run it

- Run `docker-compose up --build`

- If you want to use your PostgreSQL running on your machine: `npm install` & `npm run start:dev`

## Testing

- Run `npm test`

- Run the app and go to `http://localhost:3000/graphql` and try the following queries:

- **Create User**:

```
mutation{createUser(firstName: "Test", lastName: "Test", email: "test@test.com", age: 30, yearsOfExperience:10){
    id
    firstName,
    email,
    id
}}
```

- **Get All users**:

```
query {
  getUsers{
    id,
    age,
    firstName,
    lastName,
    yearsOfExperience,
    picture
  }
}
```

- **Update User Email**:

```
mutation{updateUserEmail(id:1, email:"newEmail@gmail.com"){
  id,
  firstName,
  email
}}
```

## Documentation

- **GraphQL**: https://graphql.org/learn/
- **Sequelize**: https://sequelize.org/docs/v6/getting-started/
