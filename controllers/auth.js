const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOtpHelper,checkOtpHelper } = require("../helpers/otpHelper");

const User = require("../models/user");
const RegUser = require("../models/registrationNumber");

//functions

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });
    if (user) {
      bcrypt.compare(password, user.password).then((status) => {
        if (status) {
          let token = jwt.sign(
            { mobile: user.mobile, _id: user._id },
            "secret",
            { expiresIn: "365d" }
          );

          res.json({
            status: true,
            profile: {
              user: {
                name: user.name,
                _id: user._id,
                mobile: user.mobile,
                status: user.status,
                role: user.role,
              },
              token,
            },
          });
        } else res.json({ status: false, message: "Invalid login" });
      });
    } else res.json({ status: false, message: "Invalid login" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await RegUser.findOne({ mobile });
    if (!user)
      res.json({
        status: false,
        message: "This mobile number is not available for registration",
      });
    else if (user.status)
      res.json({ status: false, message: "user already registered" });
    else {
      const number = parseInt(mobile);
      sendOtpHelper(number)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(data);
        });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to send otp please try again",
    });
  }
};

exports.checkOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    checkOtpHelper(mobile,otp)
      .then(async (data) => {
        console.log(data.status);
        if (data.status === "approved") {
          const user = await RegUser.findOne({ mobile });
          await User.create({ mobile, name: user.name,otp });
          await RegUser.updateOne({ mobile }, { status: true });
          res.json({ status: true, message: "Otp verified" });
        } else {
          res.json({ status: false, message: "Failed to verify" });
        }
      })
      .catch((err) => {
        console.log("error in verification", err);
        res.status(500).json({
          status: false,
          message: "something went wrong please try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "something went wrong please try again",
    });
  }
};

exports.createPassword = async (req, res) => {
  try {
    const { mobile, password,otp } = req.body;

    const user = await User.findOne({ mobile,otp });
    if (user) {
      const hassed = await bcrypt.hash(password, 10);
      if (
        (await User.updateOne({ mobile }, { password: hassed }))
          .modifiedCount == 1
      ) {
        let token = jwt.sign({ mobile: user.mobile, _id: user._id }, "secret", {
          expiresIn: "365d",
        });

        res.json({
          status: true,
          profile: {
            user: {
              name: user.name,
              _id: user._id,
              mobile: user.mobile,
              status: user.status,
              role: user.role,
            },
            token,
          },
        });
      } else res.json({ status: false, message: "Something went wrong" });
    } else res.json({ status: false, message: "Please verify your number" });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};
