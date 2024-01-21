import { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./user/schema";
import { root } from "./user/resolvers";
import cors, { CorsOptions } from "cors";
import "dotenv/config";
import Database from "./database/database";

export default class Server {
  db: Database;

  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:3000",
    };
    app.use(cors(corsOptions));

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
      })
    );
  }

  private syncDatabase(): void {
    this.db = new Database();
    this.db.sequelize?.sync();
  }
}
