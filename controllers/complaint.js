const Complaint = require("../models/complaint");

exports.addComplaint = async (req, res) => {
  try {
    const { message, image } = req.body;
    const { userId } = req;
    if (image)
      if (image.id && image.url) {
        await Complaint.create({ message, image, userId });
        res.json({ status: true });
      } else res.json({ status: false, message: "Missing data" });
    else {
      await Complaint.create({ message, userId });
      res.json({ status: true });
    }
  } catch (error) {
    res.json({ status: false, message: "Something went wrong" });
  }
};

exports.editComplaint = async (req, res) => {
  try {
    const { image, _id, message } = req.body;
    const { userId } = req;

    if (image)
      if (image.id && image.url) {
        if (
          (await Complaint.updateOne({ _id, userId }, { message, image }))
            .modifiedCount === 1
        )
          res.json({ status: true });
        else res.json({ status: false, message: "Failed to edit complaint" });
      } else res.json({ status: false, message: "Missing data" });
    else {
      if (
        (await Complaint.updateOne({ _id, userId }, { message }))
          .modifiedCount === 1
      )
        res.json({ status: true });
      else res.json({ status: false, message: "Failed to edit complaint" });
    }
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.getComplaint = async (req, res) => {
  try {
    const { status } = req.params;
    const { userId } = req;

    if (status === "All") {
      const complaint = await Complaint.find({ status: "active" })
        .sort({ _id: -1 })
        .select(["message", "image", "_id", "date"]);
      res.json({ status: true, complaint });
    } else if (status === "Own") {
      const complaint = await Complaint.find({ userId }).sort({ _id: -1 });
      res.json({ status: true, complaint });
    } else res.json({ status: false, message: "invalid params" });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.getAllBlockedComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.find({ status: "blocked" })
      .sort({ _id: -1 })
      .select(["message", "_id", "image", "report", "date", "reply"]);
    res.json({ status: true, complaint });
  } catch (error) {
    res.json({ status: false, message: "somthing went wrong" });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const { _id } = req.body;
    const { userId } = req;
    if ((await Complaint.deleteOne({ _id, userId })).deletedCount === 1)
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to delete complaint" });
  } catch (error) {
    res.json({ status: false, message: "somthing went wrong" });
  }
};

exports.blockReqComplaint = async (req, res) => {
  try {
    const { _id } = req.body;
    if (
      (await Complaint.updateOne({ _id }, { status: "requested" }))
        .modifiedCount === 1
    )
      res.json({ status: true });
    else res.json({ status: false, message: "Failed request for block" });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.replyComplaint = async (req, res) => {
  try {
    const { _id, reply } = req.body;
    if ((await Complaint.updateOne({ _id }, { reply })).modifiedCount === 1)
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to reply" });
  } catch (error) {
    res.json({ status: false, message: "somthing went wrong" });
  }
};

exports.reportComplaint = async (req, res) => {
  try {
    const { _id } = req.body;
    if (
      (await Complaint.updateOne({ _id }, { $inc: { report: 1 } }))
        .modifiedCount === 1
    ) {
      const com = await Complaint.findOne({ _id }).select("report");

      if (com.report % 10===0)
        await Complaint.updateOne({ _id }, { status: "blocked" });

      res.json({ status: true });
    } else res.json({ status: false, message: "Failed to report" });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.unBlockComplaint = async (req, res) => {
  try {
    const { _id } = req.body;
    if (
      (
        await Complaint.updateOne(
          { _id, status: "blocked" },
          { status: "active" }
        )
      ).modifiedCount === 1
    )
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to unblock " });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};
