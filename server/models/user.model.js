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
      default: false,
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
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be 8 or more characters"],
    },
  },
  { timestamps: true }
);
// UserSchema.virtual("confirmedPassword")
//   .get(() => this.confirmedPassword)
//   .set((value) => (this.confirmedPassword = value));

// UserSchema.pre("validate", function (next) {
//   if (this.confirmedPassword !== this.password) {
//     this.invalidate(
//       "confirmedPassword",
//       "The password and confirmed password must match!"
//     );
//   }
//   next(); // continue validating and running like normal
// });

module.exports = model("User", UserSchema);
