var express = require("express");
var app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index");
});

app.post('/', (req, res) => {
  res.send("Hola " + req.body.name);
});

app.listen(3000, () => console.log("Listening on port 3000!"));
