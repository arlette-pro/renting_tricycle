const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      lowercase: false,
      validate: (name) => (name ? true : false),
    },
    deactivated: {
      type: Boolean,
      required: true,
      unique: false,
      lowercase: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (email) => (email ? true : false),
    },
    role: {
      type: String,
      required: true,
      unique: false,
      lowercase: false,
      validate: (value) =>
        ["Admin", "PT", "LT"]
          .map((role) => role.toLowerCase())
          .includes(value.toLowerCase()),
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
