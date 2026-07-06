const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  next();
});

app.get("/", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
