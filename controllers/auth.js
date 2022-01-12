const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
          delete user.password;
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
