const express = require("express");

// app1 listens on port 5377, return current directory
const app1 = express();
app1.use(express.static(__dirname));
app1.listen(5377);

// app2 listens on port 5378, return data
const app2 = express();
app2.get("/", function (_req, res) {
  // 1. CORS
  // res.header("Access-Control-Allow-Origin", "*");

  // 2. JSONP
  const func = _req.query.callback;
  res.send(func + "({name: 'John', age: 30})");
});
app2.listen(5378);

console.log(
  "Server is running on http://localhost:5377/ and http://localhost:5378/",
);
