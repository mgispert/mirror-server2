const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

//====== Create route for user profile
router.get("/:userId", (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((userFromDB) => {
      res.json(userFromDB);
    })

    .catch((err) => {
      res.status(500).json({
        message: "error getting user profile",
        error: err,
      });
    });
});

//====== Create get & post route for user edit

router.put("/:userId/edit", async (req, res) => {
  const userId = req.user._id;

  const newDetails = {
    username: req.body.username,

    email: req.body.email,
  };
  const salted = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(req.body.password, salted);

  newDetails.password = hashedPwd;

  User.findByIdAndUpdate(userId, newDetails)
    .then(() => {
      res.json({});
    })
    .catch((err) => {
      res.status(500).json({
        message: "error editing user profile",
        error: err,
      });
    });
});

//====== Create route for user delete
router.post("/:userId/delete", (req, res) => {
  const userId = req.user._id;

  User.findByIdAndDelete(userId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({
        message: "error deleting user profile",
        error: err,
      });
    });
});

module.exports = router;
