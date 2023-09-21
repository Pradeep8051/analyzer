const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/Text_Anaylize";
const connectDB = () => {
  try {
    mongoose.connect(URI).then((res) => {
      if (res) {
        console.log(`MongoDb is connected ${URI}`);
      }else{
        console.log("database not connected");
      }
    });
  } catch (error) {
    console.log(error.message)
  }
};
module.exports = connectDB;