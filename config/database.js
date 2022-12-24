const mongoose = require("mongoose");
const mongourl =
  "mongodb+srv://kfareedha:kfareedha1989@cluster0.ix9d75z.mongodb.net/voicedots?retryWrites=true&w=majority";
const mongoconnect = mongoose.connect(mongourl, () =>
  console.log("database connected")
);

module.exports = {
  mongoconnect,
};
