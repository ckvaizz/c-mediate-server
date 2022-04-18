const req = require("express/lib/request");
const Suggestion = require("../models/suggestion");

exports.addSuggestion = async (req, res) => {
  try {
    await Suggestion.create({ userId: req.userId, message: req.body.message });
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false, message: "somthing went wrong" });
  }
};

exports.editSuggestion = async (req, res) => {
  try {
    const { _id, message } = req.body;
    const { userId } = req;

    if (
      (await Suggestion.updateOne({ _id, userId, status: true }, { message }))
        .modifiedCount === 1
    )
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to edit suggestion" });
  } catch (error) {
    res.json({ status: false, message: "somthing went wrong" });
  }
};

exports.deleteSuggestion = async (req, res) => {
  try {
    const { _id } = req.body;
    const { userId } = req;
    if ((await Suggestion.deleteOne({ _id, userId })).deletedCount === 1)
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to delete suggestion" });
  } catch (error) {
    res.json({ status: false, message: "somthing went wrong" });
  }
};

exports.blockSuggestion = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if ((await Suggestion.updateOne({ _id }, { status })).matchedCount === 1)
      res.json({ status: true });
    else
      res.json({
        status: false,
        message: `Failed to ${status ? "unblock" : "block"}`,
      });
  } catch (error) {
    res.json({ status: false, message: "somthing went wrong" });
  }
};

exports.getSuggestion = async (req, res) => {
  try {
    const { status } = req.params;
    const { userId } = req;
    if (status === "All") {
      const suggestions = await Suggestion.find({ status: true,userId :{$ne:userId} }).sort({
        _id: -1,
      });
      res.json({ status: true, suggestions });
    } else if (status === "own") {
      const suggestions = await Suggestion.find({ userId }).sort({ _id: -1 });
      res.json({ status: true, suggestions });
    } else res.json({ status: false, message: "Unknown params ..." });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.getAllBlockedSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.find({ status: false }).sort({
      _id: -1,
    });
    res.json({ status: true, suggestion });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};
