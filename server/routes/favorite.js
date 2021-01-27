const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/favoriteNumber", auth, (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, movieInfo) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: movieInfo.length });
  });
});

router.post("/favorited", auth, (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, movieInfo) => {
    if (err) return res.status(400).send(err);

    let result = false;

    if (movieInfo.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFavorite", auth, (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post("/addFavorite", auth, (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getFavoredMovie", auth, (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom })
    .populate("userFrom")
    .exec((err, favoredVideos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, favoredVideos });
    });
});

router.post("/removeFavoredMovie", auth, (req, res) => {
  Favorite.findOneAndDelete({
    userFrom: req.body.userFrom,
    movieId: req.body.movieId,
  }).exec((err, removedMovie) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, removedMovie });
  });
});

module.exports = router;
