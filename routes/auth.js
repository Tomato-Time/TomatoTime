const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");
const { makePublicUser } = require("../models/user");
const security = require("../middleware/security");

// makes use of the user model
router.post("/login", async (req, res, next) => {
  try {
    // take the user's email and pw, attempt to authenticate them
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // create a new user in our db. first, last, email, pw
    const user = await User.register(req.body);
    const token = createUserJwt(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = makePublicUser(user);
    return res.status(200).json({ user: publicUser });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
