const mongoose = require("mongoose");

const {MONGO_URI} = process.env;

mongoose.set('strictQuery', false);

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        console.log("Not connected to database");
    })
}

function cleanup() {
    mongoose.connection.close(function () {
      console.log('Mongoose connection closed.');
      process.exit(0);
    });
  }
  
process.on('SIGINT',cleanup)
process.on('exit',cleanup)
process.on('SIGTERM', cleanup);
