const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  pastExperience: { type: String },
  skillSets: { type: [String] },
  educationalQualification: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("AdaanUser", userSchema);

module.exports = User;