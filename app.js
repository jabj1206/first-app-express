const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "pug");
app.set("views", "views");

// app.use(express.urlencoded());

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/Visitantes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => console.log(error));

mongoose.connection.on("error", err => {
  console.log(err);
});

// definimos el schema
var schema = mongoose.Schema({
  name: String,
  count: Number
});

// definimos el modelo
var Visitor = mongoose.model("Visitor", schema);

app.get("/", (req, res) => {
  let name = req.query.name;

  Visitor.findOne({ name: name }, function(err, visitor) {
    // if (err) return console.error(err);
    if (visitor) {
      console.log(visitor);
      visitor.count++;
      visitor.save(function(err) {
        if (err) return console.error(err);
      });
    } else {
      if (name) {
        Visitor.create({ name: `${name}`, count: 1 }, function(err) {
          if (err) return console.error(err);
        });
      } else {
        Visitor.create({ name: "Anónimo", count: 1 }, function(err) {
          if (err) return console.error(err);
        });
      }
    }
  });

  Visitor.find(function(err, visitor) {
    if (err) return console.error(err);
    console.log(visitor);
    res.render("index",{visitors: visitor})
  });

  // res.send("<h1>El visitante fue almacenado con éxito</h1>");
});

app.listen(3000, () => console.log("Listening on port 3000!"));
