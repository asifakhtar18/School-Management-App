const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  fees: { type: Number, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Class", ClassSchema);

// students: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" } }],
