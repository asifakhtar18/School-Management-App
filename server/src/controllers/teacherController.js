const Teacher = require("../models/Teacher");

exports.getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user._id; // Assuming the user ID is attached to the request
    const teachers = await Teacher.find({ user: userId })
      .populate("assignedClass")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalTeachers = await Teacher.countDocuments({ user: userId });
    res.json({
      teachers,
      totalTeachers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTeachers / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request
    const teacher = await Teacher.findOne({
      _id: req.params.id,
      user: userId,
    }).populate("assignedClass");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTeacher = async (req, res) => {
  const { name, gender, dob, contactDetails, salary, assignedClass } = req.body;
  const userId = req.user._id;
  try {
    const newTeacher = new Teacher({
      name,
      gender,
      dob,
      contactDetails,
      salary,
      assignedClass,
      user: userId,
    });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true }
    ).populate("assignedClass");
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const userId = req.user._id;
    const deletedTeacher = await Teacher.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
