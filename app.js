var express = require("express");
var app = express();

app.get("/", (req, res) => {
  var i = 1;
  var max = 50;
  for (; i <= max; i++) {
    if (i % 2 === 0) {
      res.write(`<p>${i} Soy Par!</p>`);
    } else {
      res.write(`<p>${i} Soy Impar!</p>`);
    }
  }
  res.end();
});

app.listen(3000, () => console.log("Listening on port 3000!"));
