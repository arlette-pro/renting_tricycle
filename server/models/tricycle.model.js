const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const TricycleSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
    },

    weightCapacity: {
      type: Number,
      required: true,
    },
    volumeCapacity: {
      type: Number,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
      unique: false,
      lowercase: false,
    },
    userId: {
      type: String,
      required: true,
      unique: false,
      lowercase: false,
    },
    disponibility: {
      type: Date,
      required: true,
      unique: false,
      lowercase: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Tricycle", TricycleSchema);
