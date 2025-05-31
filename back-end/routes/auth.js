var express = require("express");
var router = express.Router();
const db = require("../db/main");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.post("/signup", async function (req, res, next) {
  console.log(req.body);
  const { email, password } = req.body;
  const existingUser = await db.findOne("users", { email });
  if (existingUser) {
    res.sendStatus(409);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const initUser = {
    firstName: "",
    lastName: "",
    gender: "",
  };
  const newUser = await db.insertOne("users", {
    email,
    passwordHash,
    profile: initUser,
    isVerified: false,
  });
  jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
      profile: newUser.profile,
      isVerified: newUser.isVerified,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
    (err, token) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ token });
    }
  );
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  console.log(email, password);
  const currentUser = await db.findOne("users", { email });

  if (!currentUser) {
    return res.sendStatus(401);
  }
  console.log(currentUser);
  const passwordHash = currentUser.passwordHash;
  console.log(password, passwordHash);
  const isCorrect = await bcrypt.compare(password, passwordHash);
  if (isCorrect) {
    jwt.sign(
      {
        id: currentUser.id,
        email: currentUser.email,
        profile: currentUser.profile,
        isVerified: currentUser.isVerified,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).json({ token });
      }
    );
  } else {
    return res.sendStatus(401);
  }
});
module.exports = router;
