const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("./user");
const routes = require("./routes");

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", function(e) {
  console.error(e);
});

const app = express();

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));


app.use("/", routes);

app.listen(3000, () => console.log("listening 3000"));
