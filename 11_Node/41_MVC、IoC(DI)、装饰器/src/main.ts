import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { prisma } from "./db";
import "./post/controller";
import { PostService } from "./post/service";
import "./user/controller";
import { UserService } from "./user/service";

const container = new Container();

container.bind("PrismaClient").toConstantValue(prisma);
container.bind<UserService>("UserService").to(UserService).inSingletonScope();
container.bind<PostService>("PostService").to(PostService).inSingletonScope();

const server = new InversifyExpressServer(container, null, {
  rootPath: "/api"
});

server.setConfig((app) => {
  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });
});

server.setErrorConfig((app) => {
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    res.status(400).json({
      message: "Request failed",
      errors: err
    });
  });
});

const app = server.build();
const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
