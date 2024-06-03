const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userData");

const db = mongoose.connection;

db.on("connected", (err) => {
  if (err) {
    console.log("data base not connected");
  }
  console.log("data base successfully conected");
});
