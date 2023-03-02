const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    profile: { type: String, require: true },
    password: { type: String, require: true },
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
