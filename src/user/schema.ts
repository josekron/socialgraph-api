import { buildSchema } from "graphql";

const schema = buildSchema(`
    type User {
        id: Int!
        firstName: String!
        lastName: String!
        email: String!
        age: Int!
        yearsOfExperience: Int
        picture: String
    }

    type Query {
        getUsers: [User]
        getUser(id: Int!): User
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, age: Int!, yearsOfExperience: Int!): User!
        updateUserEmail(id: Int!, email: String!): User!
    }
    `);

export default schema;
