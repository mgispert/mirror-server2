const router = require("express").Router();
const Entry = require("../models/Entry.model");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Entry.find({ creator: req.user._id })
    .populate("creator")
    .then((allEntries) => {
      res.json(allEntries);
    })

    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/create", (req, res) => {
  const entryDetails = {
    date: req.body.date,
    title: req.body.title,
    isFavourite: req.body.isFavourite,
    grade: req.body.grade,
    grateful: req.body.grateful,
    emotion: req.body.emotion,
    person: req.body.person,
    improvement: req.body.improvement,
    free: req.body.free,
    creator: req.user._id,
  };

  Entry.create(entryDetails)
    .then((entryCreated) => {
      res.status(201).json(entryCreated);
    })
    .catch((err) => {
      console.log("error creating a new entry", err);
      res.status(500).json({
        message: "error creating a new entry",
        error: err,
      });
    });
});

router.get("/:entryId", (req, res, next) => {
  const { entryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Entry.findById(entryId)
    .then((entry) => res.json(entry))
    .catch((err) => res.status(500).json(err));
});

router.put("/:entryId/edit", (req, res, next) => {
  const { entryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const entryDetails = {
    date: req.body.date,
    title: req.body.title,
    isFavourite: req.body.isFavourite,
    grade: req.body.grade,
    grateful: req.body.grateful,
    emotion: req.body.emotion,
    person: req.body.person,
    improvement: req.body.improvement,
    free: req.body.free,
    creator: req.user,
  };

  Entry.findByIdAndUpdate(entryId, entryDetails, { new: true })
    .then((updatedEntry) => res.json(updatedEntry))
    .catch((error) => res.status(500).json(error));
});

router.delete("/delete/:entryId", (req, res, next) => {
  const { entryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Entry.findByIdAndRemove(entryId)
    .then(() =>
      res.json({
        message: `Entry with ${entryId} is removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
