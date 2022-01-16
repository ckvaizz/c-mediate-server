const RegUser = require("../models/registrationNumber");

exports.addUser = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const user = await RegUser.findOne({ mobile });
    if (user) res.json({ status: false, message: "mobile is already added" });
    else {
      await RegUser.create({ name, mobile });
      res.json({ status: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};
