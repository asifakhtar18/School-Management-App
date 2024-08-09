const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

// CRUD operations for Class

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const classes = await Class.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalClasses = await Class.countDocuments();

    res.json({
      classes,
      totalClasses,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalClasses / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
  try {
    const class_ = await Class.findById(req.params.id).populate(
      "teacher students"
    );
    if (!class_) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(class_);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const { name, year, teacher, fees, students } = req.body;
  try {
    const newClass = new Class({ name, year, teacher, fees, students });
    console.log("req here", name, year, teacher, fees, students);
    const savedClass = await newClass.save();
    console.log("saved class", savedClass);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("teacher students");
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
