import request from "supertest-graphql";
import gql from "graphql-tag";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import express, { Application } from "express";
import Database from "../../src/database/database";
import Server from "../../src/server";

const app: Application = express();
const server: Server = new Server(app);

describe("Test User routes", () => {
  const database = new Database();
  beforeAll(async () => {
    await database.sequelize?.sync();
  });

  afterAll(async () => {
    await database.sequelize?.close();
  });

  test("Should returns 0 users", async () => {
    const n = Math.floor(Math.random() * 1000);

    await request(app)
      .query(
        gql`
          query {
            getUsers {
              id
              age
            }
          }
        `
      )
      .expectNoErrors();
  });

  test("Should create a user", async () => {
    const n = Math.floor(Math.random() * 1000);

    await request(app)
      .query(
        gql`
          mutation {
            createUser(firstName: String!, lastName: String!, email: String!, age: Int!, yearsOfExperience: Int!): {
              firstName
              age
              id
            }
          }
        `
      )
      .variables({
        firstName: `test_${n}`,
        lastName: `test_${n}`,
        email: `email_${n}@test.com`,
        age: 30,
        yearsOfExperience: 10,
      })
      .expectNoErrors();
  });

  test("Should update the email of an user", async () => {
    const n = Math.floor(Math.random() * 1000);

    await request(app)
      .query(
        gql`
          mutation {
            updateUserEmail(id: Int!, email: String!): {
              firstName
              age
              id
              email
            }
          }
        `
      )
      .variables({
        id: 1,
        email: `newEmail_${n}@test.com`,
      })
      .expectNoErrors();
  });
});
