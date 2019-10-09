const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// definimos el schema
var schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// hashes the password
schema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

schema.statics.auth = async function(email, password) {
  
  const user = await mongoose.model("User").findOne({ email: email });
 
  if (user) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result === true ? user : null);
      });
    });
    return user;
  }
  return null;
};

module.exports = mongoose.model("User", schema);
