import { Sequelize } from "sequelize-typescript";
import { User } from "../user/model/user.interface";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      host: process.env.DB_HOST,
      database: process.env.DB,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: "postgres",
      pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000,
      },
      models: [User],
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;
