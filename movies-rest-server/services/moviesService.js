const Movies = require("../models/Movies");
const User = require("../models/User");

exports.getOne = (moviesId) => {
  return Movies.findById(moviesId);
};

exports.getOneDetailed = (moviesId) => {
  return Movies.findById(moviesId).populate("owner");
};
// Get all Movies
exports.getAll = () => {
  return Movies.find();
};

exports.create = async (userId, moviesData) => {
  const createdMovie = await Movies.create({
    owner: userId,
    ...moviesData,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { createdMovies: createdMovie._id },
  });

  return createdMovie;
};

exports.update = (moviesId, moviesData) => {
  return Movies.findByIdAndUpdate(moviesId, moviesData, { runValidators: true });
};

exports.delete = (moviesId) => {
  return Movies.findByIdAndDelete(moviesId);
};

exports.search = (name) => {
  let query = {};

  if (name) {
    query.name = new RegExp(name, "i");
  }

  return Movies.find(query);
};
