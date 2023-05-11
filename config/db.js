// import mongoose
const mongoose = require('mongoose');

// define an asynchronous function that initiates DB connection
const initiateDBConnection = async () => {
  try {
    // call connect() method in mongoose.
    // the method expects the connection URI which we stored as an environment variable.
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log('Connected to Mongo DB Server.');
  } catch (error) {
    console.log(error);
  }
};

// export the function we created as a defualt export.
module.exports = initiateDBConnection;
