// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     name: { type: String, trim: true, required: true },
//     email: { type: String, trim: true, required: true },
//     phone: { type: Number, trim: true, required: true },
//     address: { type: String, trim: true },
//     password: { type: String, trim: true, required: true },
//     newPassword: { type: String, trim: true },
//     conformPassword: { type: String, trim: true, required: true },

//     otp: { type: String, default: null },

//     otpExpiry: { type: Date, default: null },

//     isVerified: { type: Boolean, default: false, },

//     googleId: { type: String, default: null },
//     authProvider: { type: String, enum: ["local", "google"], default: "local" }
// },
//     { timestamps: true }
// );
// const userModel = mongoose.model("user_data", userSchema)
// export default userModel;


import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    phone: {
      type: Number,
      required: function () {
        return this.authProvider === "local";
      },
    },

    address: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },

    newPassword: {
      type: String,
    },

    conformPassword: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    googleId: {
      type: String,
      default: null,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user_data", userSchema);