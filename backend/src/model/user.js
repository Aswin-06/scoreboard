const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    points: Number,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
