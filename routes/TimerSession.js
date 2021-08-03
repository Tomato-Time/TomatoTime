const express = require("express");
const router = express.Router();
const TimerSession = require("../models/timerSession");

// get the time the user has used pomodoro by date
router.get("/", async (req, res, next) => {
  try {
    //
    const { user } = res.locals;
    const userTimeLogged = await TimerSession.fetchUserTimeByDate({ user });
    return res.status(200).json({ userTimeLogged });
  } catch (err) {
    next(err);
  }
});

// add to time the user has used pomodoro
router.post("/", async (req, res, next) => {
  try {
    const { user } = res.locals;
    const timeAdded = await TimerSession.addToUserTimeLog({
      user,
      minutes: req.body,
    });
    // console.log("the req.body is", req.body);
    // console.log("the time Added is", timeAdded);
    return res.status(201).json({ timeAdded });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
