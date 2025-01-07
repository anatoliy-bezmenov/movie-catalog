const router = require("express").Router();

const moviesService = require("../services/moviesService");
const { getErrorMessage } = require("../utils/errorUtils");
const { isAuth } = require("../middlewares/authMiddeware");
const { User } = require('../models/User');

router.get("/", async (req, res) => {
  const movies = await moviesService.getAll().lean();
  res.json(movies);
});

router.post("/create", isAuth, async (req, res) => {
  const movieData = req.body;
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    await moviesService.create(req.user._id, movieData);
    res.json(req.body);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q
  const data = await moviesService.search(query)
  res.json(data);
})

router.get("/:moviesId/edit", isAuth,  isMoviesOwner, async (req, res) => {
  const moviesData = req.body;

  try {
    const editedMovie = await moviesService.update(req.params.moviesId, moviesData);
    res.json(editedMovie); 
  } catch(err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }

});

router.post("/:moviesId/update", isAuth,  isMoviesOwner, async (req, res) => {
  const moviesData = req.body;

  try {
    const editedMovie = await moviesService.update(req.params.moviesId, moviesData);
    res.json(editedMovie); 
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/:moviesId/details", async (req, res) => {
  const movies = await moviesService.getOneDetailed(req.params.moviesId).lean();
  const isOwner = movies?.owner && movies?.owner._id == req.user?._id;

  res.json({ ...movies, isOwner });
});

router.get("/:moviesId/delete", isAuth , isMoviesOwner, async (req, res) => {
  try {
    const movies = await moviesService.delete(req.params.moviesId);
    res.json(movies); 
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

async function isMoviesOwner(req, res, next) {
  const movies = await moviesService.getOneDetailed(req.params.moviesId).lean();

  if (movies?.owner?._id != req.user?._id) {
    return res.status(401).json({ error: "Unauthorized owner" });
  }
  next();
};

module.exports = router;