const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    if (pathname === "/login") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Login page\n");
      return;
    } else {
      res.end("404 Not Found\n");
    }
  })
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
