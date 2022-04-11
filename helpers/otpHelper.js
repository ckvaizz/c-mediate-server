

const otpclient = require("twilio")(
  process.env.twiloAccountSID,
  process.env.twiloAuthTOKEN
);

exports.sendOtpHelper = (number) =>
  new Promise( (resolve, reject) => {
    otpclient.verify
      .services(process.env.twiloServiceId)
      .verifications.create({
        to: `+91${number}`,
        channel: "sms",
      })
      .then(() => {
        resolve({ status: true, message: "Otp sended" });
      })
      .catch((err) => {
        console.log("err", err);
        reject({
          status: false,
          message: "Failed to send otp please try again",
        });
      });
  });

  exports.checkOtpHelper=(mobile,otp)=> new Promise((resolve,reject)=>{
    otpclient.verify
    .services(process.env.twiloServiceId)
    .verificationChecks.create({
      to: `+91${mobile}`,
      code: otp,
    }).then(data=>resolve(data))
    .catch(err=>reject(err))
  })