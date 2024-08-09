const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  contactDetails: { type: String, required: true },
  salary: { type: Number, required: true },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
