const Complaint = require("../models/complaint");
const User = require("../models/user");
exports.getBlockRequiest = async (req, res) => {
  try {
    const complaint = await Complaint.find({ status: "requested" });
    res.json({ status: true, complaint });
  } catch (error) {
    res.status(500).json({ status: false, message: "something wrong" });
  }
};

exports.blockComplaint = async (req, res) => {
  try {
    const { _id } = req.body;
    const com = await Complaint.findOneAndUpdate(
      { _id },
      { status: "blocked" },
      { new: true }
    ).select({ status: 1, userId: 1 });
    let resp = {};
    if (com.status === "blocked") {
      const user = await User.findOneAndUpdate(
        { _id: com.userId },
        { $inc: { block: 1 } },
        { new: true }
      ).select("block");
      if (user.block % 10 === 0) {
        if (
          (await User.updateOne({ _id: user._id }, { status: "blocked" }))
            .modifiedCount === 1
        ) {
          resp = { status: true, message: "user blocked by too many reports" };
        } else resp = { status: false, message: "failed to block" };
      } else resp = { status: true, message: "complaint blocked " };
    } else resp = { status: false, message: "failed to block " };

    res.json(resp);
  } catch (error) {
    res.status(500).json({ status: false, message: "something wrong" });
  }
};

exports.rejectBlockReq = async (req, res) => {
  try {
    const { _id } = req.params;
    if (
      (await Complaint.updateOne({ _id }, { status: "active" }))
        .modifiedCount === 1
    )
      res.json({ status: true, message: "block request rejected" });
    else res.json({ status: false, message: "failed" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something wrong" });
  }
};


