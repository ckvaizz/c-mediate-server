  var mongoose = require("mongoose");

  exports.connect = () => {
    //Set up default mongoose connection
    var mongoDB = process.env.MONGO_DB;
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //Get the default connection
    var db = mongoose.connection;
    db.addListener('connected', ()=> console.log('DB CONNECTED'))
    //Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  };