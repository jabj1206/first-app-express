const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/users", {
  useNewUrlParser: true
});
mongoose.connection.on("error", function(e) {
  console.error(e);
});
app.use(express.urlencoded());
app.set("view engine", "pug");
app.set("views", "views");

// definimos el schema
var schema = mongoose.Schema({ name: String, email: String, password: String });
// definimos el modelo
var User = mongoose.model("User", schema);

app.get("/register", async (req, res) => {
  res.render("form");
});

app.post("/register", async (req, res) => {
  const {name, email, password} = req.body
  const user = new User({name, email, password });
  await user.save();
  res.redirect("/");
});

app.get("/", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.render("index", { users: users });
});

app.listen(3000, () => console.log("listening 3000"));
