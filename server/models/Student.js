const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  contactDetails: { type: String, required: true },
  feesPaid: { type: Number, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

module.exports = mongoose.model("Student", StudentSchema);
