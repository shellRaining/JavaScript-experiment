const express = require("express");
const app = express();

app.get("/request", (req, res) => {
  res.end("request success");
});

app.listen(5378);
console.log("server is running at http://localhost:5378");
