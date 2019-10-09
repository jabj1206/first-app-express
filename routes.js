const mongoose = require("mongoose");
const User = require("./user");
const express = require("express");
const router = express.Router();
const requireUser = require("./middlewares/requireUser");

router.get("/register", async (req, res) => {
  res.render("form");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.redirect("/");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.auth(req.body.email, req.body.password);
    if (user) {
      req.session.userId = user._id;
      return res.redirect("/");
    } else {
      res.render("login", { error: "Wrong email or password. Try again!" });
    }
  } catch (e) {
    console.log("error: " + e);
    return next(e);
  }
});

router.get("/logout", (req, res) => {
  req.session.userId = null;
  return res.redirect("/");
});

router.get("/", requireUser, async (req, res) => {
  const users = await User.find();
  res.render("index", { users: users });
});

module.exports = router;
