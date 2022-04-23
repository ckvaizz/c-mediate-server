const bcrypt = require("bcrypt");
const RegUser = require("../models/registrationNumber");
const User = require("../models/user");
const { checkOtpHelper, sendOtpHelper } = require("../helpers/otpHelper");
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
      .then(async (status) => {
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

exports.sentOtp_FP = async (req, res) => {
  const { mobile } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (user) {
      sendOtpHelper(mobile)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    } else res.json({ status: false, message: "User not registered" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.verifyOtp_FP = (req, res) => {
  try {
    const { mobile, otp } = req.body;
    checkOtpHelper(mobile, otp)
      .then(async (data) => {
        if (data.status === "approved") {
          await User.updateOne({ mobile }, { otp });
          res.json({ status: true, message: "Otp verified" });
        } else {
          res.json({ status: false, message: "Failed to verify" });
        }
      })
      .catch((err) => {
        console.log("error in verification FP", err);
        res.status(500).json({
          status: false,
          message: "something went wrong please try again",
        });
      });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.unBlockUser = async (req, res) => {
  try {
    const { _id } = req.body;
    if (
      (await User.updateOne({ _id }, { status: "active" })).modifiedCount === 1
    )
      res.json({ status: true, message: "successfully unblocked" });
    else res.json({ status: false, message: "failed to unblock" });
  } catch (error) {
    res.json({ status: false, message: "something wrong" });
  }
};

exports.editManagement = async (req, res) => {
  try {
    const { _id, name, mobile } = req.body;
    const user = await User.findOne({ mobile, role: 3 });

    if (user)
      return res.json({ status: false, message: "mobile exist with user" });
    if ((await User.updateOne({ _id }, { name, mobile })).modifiedCount === 1)
      res.json({ status: true, message: "updated" });
    else res.json({ status: false, message: "failed to update data" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something wrong" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { status } = req.params;
    if (status === "All") {
      const profile = await RegUser.find();
      res.json({ status: true, profile });
    } else if (status === "Blocked") {
      const profile = await User.find({ role: 3, status: "blocked" });
      res.json({ status: true, profile });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "something wrong" });
  }
};
