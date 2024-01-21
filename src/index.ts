import express, { Application } from "express";
import Server from "./server";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
