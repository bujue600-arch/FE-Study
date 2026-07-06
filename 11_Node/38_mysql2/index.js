import mysql2 from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const yaml = fs.readFileSync(path.join(__dirname, "db.config.yaml"), "utf8");
const config = load(yaml);
const sql = await mysql2.createConnection({
  ...config.db,
});
const app = express();
app.use(express.json());
//查询接口 全部

app.get("/", async (req, res) => {
  const [data] = await sql.query("select * from user");
  res.send(data);
});

//单个查询 params
app.get("/user/:id", async (req, res) => {
  const [row] = await sql.query(`select * from user where id = ?`, [
    req.params.id,
  ]);
  res.send(row);
});

//新增接口
app.post("/create", async (req, res) => {
  const { name, age, hobby } = req.body;
  await sql.query(`insert into user(name,age,hobby) values(?,?,?)`, [
    name,
    age,
    hobby,
  ]);
  res.send({ ok: 1 });
});

//编辑
app.post("/update", async (req, res) => {
  const { name, age, hobby, id } = req.body;
  await sql.query(`update user set name = ?,age = ?,hobby = ? where id = ?`, [
    name,
    age,
    hobby,
    id,
  ]);
  res.send({ ok: 1 });
});

//删除
app.post("/delete", async (req, res) => {
  await sql.query(`delete from user where id = ?`, [req.body.id]);
  res.send({ ok: 1 });
});
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
