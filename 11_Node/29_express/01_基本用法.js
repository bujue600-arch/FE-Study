const express = require("express");
const app = express();

app.use(express.json());

//1、get请求
app.get("/", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

//2、post请求
app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//3、动态参数
app.get("/get/:id", (req, res) => {
  res.send(`get ${req.params.id}`);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
