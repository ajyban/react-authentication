var express = require('express');
var router = express.Router();
const db = require('../db/main');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/signup', async function (req, res, next) {
  const { email, password } = req.body;
  const existingUser = await db.findOne('users', { email });
  if (existingUser) {
    res.sendStatus(409);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const initUser = {
    firstName: '',
    lastName: '',
    gender: '',
  };
  const newUser = await db.insertOne('users', {
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
    { expiresIn: '2d' },
    (err, token) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ token });
    }
  );
});

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  const currentUser = await db.findOne('users', { email });

  if (!currentUser) {
    return res.sendStatus(401);
  }
  const passwordHash = currentUser.passwordHash;
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
      { expiresIn: '2d' },
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

router.put('/users/:userId', async function (req, res, next) {
  const { userId } = req.params;
  const { authorization } = req.headers;
  const { firstName, lastName, gender } = req.body;
  if (!authorization) {
    return res.status.status(401).json({ message: 'No Auth Header' });
  }
  const headerAuthToken = authorization.split(' ')[1];
  jwt.verify(headerAuthToken, process.env.JWT_SECRET, async (err, decUser) => {
    if (err) return res.status(401).json({ message: 'Unable to verify token' });
    const { id } = decUser;
    if (id !== userId) {
      return res
        .status(403)
        .json({ message: "Not Allowed to update user's data" });
    }
    const profile = { firstName, lastName, gender };
    const currentUser = await db
      .findOneAndUpdate('users', { id: userId }, { profile })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal Error' });
        return null;
      });
    if (!currentUser) {
      return;
    }
    jwt.sign(
      {
        id: currentUser.id,
        email: currentUser.email,
        profile: currentUser.profile,
        isVerified: currentUser.isVerified,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).json({ token });
      }
    );
  });
});

module.exports = router;
