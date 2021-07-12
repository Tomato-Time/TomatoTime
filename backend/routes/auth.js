const express = require("express");
const router = express.Router();

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
    const user = await User.register({ ...req.body, isAdmin: false });
    const token = createUserJwt(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
