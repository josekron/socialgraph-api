import { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./user/schema";
import { resolvers } from "./user/resolvers";
import cors, { CorsOptions } from "cors";
import "dotenv/config";
import Database from "./database/database";
import { UserService } from "./user/service/user.service";

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

    const userService = new UserService();

    app.use("/graphql", (request, response) => {
      return graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
        context: {
          request,
          userService,
        },
      })(request, response);
    });
  }

  private syncDatabase(): void {
    this.db = new Database();
    this.db.sequelize?.sync();
  }
}
