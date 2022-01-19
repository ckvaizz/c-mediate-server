const bcrypt = require("bcrypt");
const RegUser = require("../models/registrationNumber");
const User = require("../models/user");

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

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId;

    const user = await User.findOne({ _id: userId });
    bcrypt
      .compare(oldPassword, user.password)
      .then(async(status) => {
        if (status) {
          let password = await bcrypt.hash(newPassword, 10);
          if (
            (await User.updateOne({ _id: userId }, { password }))
              .modifiedCount === 1
          )
            res.json({ status: true });
          else res.json({ status: false, message: "something went wrong" });
        } else res.json({ status: false, message: "Incorrect password" });
      })
      .catch((err) =>
        res.json({ status: false, message: "something went wrong" })
      );
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};
