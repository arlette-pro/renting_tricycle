const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs")
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [2, "First Name must be 2 or more characters"],
      validate: (firstName) => (firstName ? true : false),
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: [2, "Last Name must be 2 or more characters"],
      validate: (lastName) => (lastName ? true : false),
    },
    deactivated: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
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
// we will not save the confirm password in the database
UserSchema.virtual("confirmedPassword")
    .get( () => this.confirmedPassword)
    .set( value => this.confirmedPassword = value)


//validation for password matching
UserSchema.pre("validate", function(next){
    if (this.confirmedPassword !== this.password){
        this.invalidate("confirmedPassword", "The password and confirmed password must match!")
    }
    next(); // continue validating and running like normal
})    

//  hash the password before we save
UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
})

module.exports = model("User", UserSchema);
