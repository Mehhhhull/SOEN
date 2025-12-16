import mongoose from "mongoose";
import becrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 character long"],
    maxLength: [50, "Email must not be longer than 50 character long"],
  },
  password: {
    type: String,
    select: false,
  },
});

userSchema.statics.hashPassword = async function (password) {
  return await becrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password) {
  return await becrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "24hrs",
  });
};

const User = mongoose.model("user", userSchema);

export default User;
