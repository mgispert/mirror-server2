const router = require("express").Router();
const authRoutes = require("./auth.routes");
const entryRoutes = require("./entry.routes");
const userRoutes = require("./user.routes");
// const goalRoutes = require("./goal.routes");
// const statsRoutes = require("./stats.routes");

const { isAuthenticated } = require("../middleware/jwt.middleware");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/entry", isAuthenticated, entryRoutes);
router.use("/user", isAuthenticated, userRoutes);
// router.use("/stats", /*isAuthenticated*/ statsRoutes);

module.exports = router;
