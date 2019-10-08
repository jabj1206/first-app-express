var express = require("express");
var app = express();

// app.set("view engine", "pug");
// app.set("views", "views");

// app.use(express.urlencoded());

app.get('/', (req, res) => {
  let head = req.header('User-Agent')
  res.send(head)
})
app.listen(3000, () => console.log("Listening on port 3000!"));
