const Complaint = require("../models/complaint");

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
    // if (
    //   (await Complaint.updateOne({ _id }, { status: "blocked" }))
    //     .modifiedCount === 1
    // ) {
    // }
      const user = await Complaint.aggregate([
        {
          $match: { _id },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ]);
      res.json({user})
  } catch (error) {
    res.status(500).json({ status: false, message: "something wrong" });
  }
};
