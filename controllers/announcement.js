const Announcement = require("../models/announcement");

exports.addAnnouncement = async (req, res) => {
  try {
    const { title, message, dueDate,  pdf } = req.body;
    const data = {
      title,
      message,
      dueDate,
    };
    
    if (pdf)
      if (pdf.url && pdf.id) data["pdf"] = pdf;
      else res.json({ status: false, message: "missing data" });
    await Announcement.create(data);
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.editAnnouncement = async (req, res) => {
  try {
    const { _id, title, message, dueDate,  pdf } = req.body;
    const data = {
      title,
      message,
      dueDate,
    };
   
    if (pdf)
      if (pdf.url && pdf.id) data["pdf"] = pdf;
      else res.json({ status: false, message: "missing data" });
    if ((await Announcement.updateOne({ _id }, data)).modifiedCount === 1)
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to edit " });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { _id } = req.body;
    if ((await Announcement.deleteOne({ _id })).deletedCount === 1)
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to delete" });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.getAnnouncement = async (req, res) => {
  try {
    const data = await Announcement.find().sort({ _id: -1 });
    const today = new Date().getTime();
    let resData = [];

    data.map((element) => {
      if (
        (new Date(element.dueDate).getTime() - today) / (1000 * 3600 * 24) >
          0 ||
        new Date(element.dueDate).toLocaleDateString() ==
          new Date().toLocaleDateString()
      )
        resData.push(element);
    });
    res.json({ status: true, announcement: resData });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.getAllAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.find();
    res.json({ status: false, announcement });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};
