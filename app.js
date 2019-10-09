const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
const path = require("path");
require("./user");
const routes = require("./routes");

const app = express();

app.use(cookieSession({
  name: 'session', /* una cadena de texto aleatoria */
  keys: ['key1'],
  // Cookie Options
  maxAge: 60 * 1000 // 24 hours (h*min*sec*mill)
}))

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", function(e) {
  console.error(e);
});

app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));


app.use("/", routes);

app.listen(3000, () => console.log("listening 3000"));
