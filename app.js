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

app.get("/", async (req, res) => {
  let name = req.query.name || 'Anónimo';

  if(name === 'Anónimo'){
    Visitor.create({ name: name, count: 1 });
  }else{
    Visitor.findOne({ name: name },(e,visitor)=>{
      if(visitor){
        visitor.count++
        visitor.save()
      }else{
        Visitor.create({ name: name, count: 1 });
      }  
    })


  }
  const visitors = await Visitor.find()
  res.render('index', { visitors: visitors })
  });


app.listen(3000, () => console.log("Listening on port 3000!"));
