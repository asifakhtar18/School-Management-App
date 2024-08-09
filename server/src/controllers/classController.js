const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const authMiddleware = require("../middlewares/authMiddleware");

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const classes = await Class.find({ user: req.user._id })
      .populate("teacher students")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalClasses = await Class.countDocuments({ user: req.user._id });

    res.status(200).json({
      classes,
      totalClasses,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalClasses / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
  try {
    const class_ = await Class.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("teacher students");
    if (!class_) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(class_);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const { name, year, teacher, fees, students } = req.body;

  try {
    // Check if the teacher exists
    if (teacher) {
      const teacherExists = await Teacher.findById(teacher);
      if (!teacherExists) {
        return res.status(404).json({ message: "Teacher not found" });
      }
    }

    // Check if the students exist
    if (students) {
      for (let studentId of students) {
        const studentExists = await Student.findById(studentId);
        if (!studentExists) {
          return res
            .status(404)
            .json({ message: `Student with ID ${studentId} not found` });
        }
      }
    }

    const data = {
      user: req.user._id,
      name,
      year,
      fees,
    };

    if (teacher) {
      data.teacher = teacher;
    }

    if (students) {
      data.students = students;
    }

    const newClass = new Class(data);
    const savedClass = await newClass.save();

    res.status(201).json(savedClass);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({ message: "Class with this name already exists" });
    } else {
      res.status(500).json({ message: "Server Error: " + error.message });
    }
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  const { name, year, teacher, fees, students } = req.body;

  try {
    // Check if the teacher exists
    if (teacher) {
      const teacherExists = await Teacher.findById(teacher);
      if (!teacherExists) {
        return res.status(404).json({ message: "Teacher not found" });
      }
    }

    // Check if the students exist
    if (students) {
      for (let studentId of students) {
        const studentExists = await Student.findById(studentId);
        if (!studentExists) {
          return res
            .status(404)
            .json({ message: `Student with ID ${studentId} not found` });
        }
      }
    }

    const updatedClass = await Class.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, year, teacher, fees, students },
      { new: true, runValidators: true }
    ).populate("teacher students");

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({ message: "Class with this name already exists" });
    } else {
      res.status(500).json({ message: "Server Error: " + error.message });
    }
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
