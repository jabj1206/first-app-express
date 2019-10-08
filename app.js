const express = require("express");
const app = express();
const mongoose = require("mongoose");

// app.set("view engine", "pug");
// app.set("views", "views");

// app.use(express.urlencoded());

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/Visitor", {
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
  date: Date
});

// definimos el modelo
var Visitor = mongoose.model("Visitor", schema);

app.get("/", (req, res) => {
  let name = req.query.name
  if(name){
    Visitor.create(
      { name: `${name}`, date: new Date(Date.now()) },
      function(err) {
        if (err) return console.error(err);
      }
    );
  } else{
    Visitor.create(
      { name: "Anónimo", date: new Date(Date.now()) },
      function(err) {
        if (err) return console.error(err);
      }
    );
  }
  res.send("<h1>El visitante fue almacenado con éxito</h1>")
});


app.listen(3000, () => console.log("Listening on port 3000!"));
