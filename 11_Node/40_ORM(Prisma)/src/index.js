import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");

if (!process.env.DATABASE_URL && existsSync(envPath)) {
  const databaseUrl = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((line) => line.trim().startsWith("DATABASE_URL="))
    ?.split("=")
    .slice(1)
    .join("=")
    .trim()
    .replace(/^["']|["']$/g, "");

  if (databaseUrl) {
    process.env.DATABASE_URL = databaseUrl;
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Please set it in 40_ORM(Prisma)/.env");
}

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
const app = express();
const port = 3000;

app.use(express.json());

//关联查找
app.get("/", async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.send(data);
});

//单个查找
app.get("/user/:id", async (req, res) => {
  const row = await prisma.user.findMany({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(row);
});

//新增
app.post("/create", async (req, res) => {
  const { name, email } = req.body;
  const data = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: {
          title: "标题",
          content: "内容",
        },
      },
    },
  });
  res.send(data);
});

//更新
app.post("/update", async (req, res) => {
  const { id, name, email } = req.body;
  const data = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });
  res.send(data);
});

//删除
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await prisma.post.deleteMany({
    where: {
      authorId: Number(id),
    },
  });
  const data = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
