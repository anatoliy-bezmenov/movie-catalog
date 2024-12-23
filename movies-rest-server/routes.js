const router = require("express").Router();

const authController = require("./controllers/authController");
const moviesController = require("./controllers/moviesController");

router.use("/auth", authController);
router.use("/movies", moviesController);

router.all("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

module.exports = router;