import request from "supertest-graphql";
import gql from "graphql-tag";
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
    const response: any = await request(app)
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

    expect(response.response?.statusCode).toEqual(200);
    expect(Array.isArray(response.data?.getUsers)).toEqual(true);
  });

  test("Should create a user", async () => {
    const n = Math.floor(Math.random() * 1000);

    const response: any = await request(app)
      .mutate(
        gql`
          mutation createUser(
            $firstName: String!
            $lastName: String!
            $email: String!
            $age: Int!
            $yearsOfExperience: Int!
          ) {
            createUser(
              firstName: $firstName
              lastName: $lastName
              email: $email
              age: $age
              yearsOfExperience: $yearsOfExperience
            ) {
              firstName
              email
              age
              id
            }
          }
        `
      )
      .variables({
        firstName: `test_first_name_${n}`,
        lastName: `test_last_name_${n}`,
        email: `test_email_${n}@test.com`,
        age: 30,
        yearsOfExperience: 10,
      })
      .expectNoErrors();

    expect(response.response?.statusCode).toEqual(200);
    expect(response.data?.createUser?.id).toBeGreaterThan(0);
    expect(response.data?.createUser?.firstName).toEqual(
      `test_first_name_${n}`
    );
    expect(response.data?.createUser?.email).toEqual(
      `test_email_${n}@test.com`
    );
    expect(response.data?.createUser?.lastName).toBeUndefined();
  });

  test("Should not create a user if email exists", async () => {
    const n = Math.floor(Math.random() * 1000);

    await request(app)
      .mutate(
        gql`
          mutation createUser(
            $firstName: String!
            $lastName: String!
            $email: String!
            $age: Int!
            $yearsOfExperience: Int!
          ) {
            createUser(
              firstName: $firstName
              lastName: $lastName
              email: $email
              age: $age
              yearsOfExperience: $yearsOfExperience
            ) {
              firstName
              email
              age
              id
            }
          }
        `
      )
      .variables({
        firstName: `test_first_name_${n}`,
        lastName: `test_last_name_${n}`,
        email: `test_email_${n}@test.com`,
        age: 30,
        yearsOfExperience: 10,
      })
      .expectNoErrors();

    // Create another user with the same email:

    const response: any = await request(app)
      .mutate(
        gql`
          mutation createUser(
            $firstName: String!
            $lastName: String!
            $email: String!
            $age: Int!
            $yearsOfExperience: Int!
          ) {
            createUser(
              firstName: $firstName
              lastName: $lastName
              email: $email
              age: $age
              yearsOfExperience: $yearsOfExperience
            ) {
              firstName
              email
              age
              id
            }
          }
        `
      )
      .variables({
        firstName: `test_first_name_${n}`,
        lastName: `test_last_name_${n}`,
        email: `test_email_${n}@test.com`,
        age: 30,
        yearsOfExperience: 10,
      })
      .expectNoErrors();

    expect(response.data).toBeNull();
    expect(response.errors.length).toEqual(1);
    expect(response.errors[0].message).toEqual(
      `email test_email_${n}@test.com is in use`
    );
  });

  test("Should update the email of an user", async () => {
    const n = Math.floor(Math.random() * 1000);

    const response: any = await request(app)
      .query(
        gql`
          mutation updateUserEmail($id: Int!, $email: String!) {
            updateUserEmail(id: $id, email: $email) {
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

    expect(response.response?.statusCode).toEqual(200);
    expect(response.data?.updateUserEmail?.id).toEqual(1);
    expect(response.data?.updateUserEmail?.email).toEqual(
      `newEmail_${n}@test.com`
    );
  });

  test("Update the email of an user do not exist should return Not Found Error", async () => {
    const n = Math.floor(Math.random() * 1000);

    const response: any = await request(app)
      .query(
        gql`
          mutation updateUserEmail($id: Int!, $email: String!) {
            updateUserEmail(id: $id, email: $email) {
              firstName
              age
              id
              email
            }
          }
        `
      )
      .variables({
        id: 400,
        email: `newEmail_${n}@test.com`,
      });

    expect(response.data).toBeNull();
    expect(response.errors.length).toEqual(1);
    expect(response.errors[0].message).toEqual("user not found");
  });
});
