const mongoose = require("mongoose");
const User = require("./user");
const express = require('express');
const router = express.Router();

router.get("/register", async (req, res) => {
  res.render("form");
});

router.post("/register", async (req, res) => {
  const {name, email, password} = req.body
  const user = new User({name, email, password });
  await user.save();
  res.redirect("/");
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.render("index", { users: users });
});

module.exports = router;