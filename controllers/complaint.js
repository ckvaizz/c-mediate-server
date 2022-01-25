const Complaint = require("../models/complaint");

exports.addComplaint = async (req, res) => {
  try {
    const { message, image } = req.body;
    const {userId}=req
    if (image)
      if (image.id && image.url) {
        await Complaint.create({ message, image ,userId});
        res.json({ status: true });
      } else res.json({ status: false, message: "Missing data" });
    else {
      await Complaint.create({ message,userId });
      res.json({ status: true });
    }
  } catch (error) {
    res.json({ status: false, message: "Something went wrong" });
  }
};
