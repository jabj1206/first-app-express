const express = require("express");
const app = express();

app.get("/makers/:param", (req, res) => {
  let param = req.params.param[0].toUpperCase() + req.params.param.slice(1);

  res.send("<h1>Hola " + param + "!</h1>");
});

app.listen(3000, () => console.log("Listening on port 3000!"));
