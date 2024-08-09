const { ObjectId } = require("mongodb");

const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

exports.getClassAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const classId = req.params.id;

    const classItem = await Class.findOne({
      _id: classId,
      user: userId,
    }).exec();

    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    const students = await Student.find({
      user: userId,
      class: classId,
    }).exec();

    const maleCount = students.filter(
      (student) => student.gender === "Male"
    ).length;
    const femaleCount = students.filter(
      (student) => student.gender === "Female"
    ).length;

    res.json({
      classId: classItem._id,
      className: classItem.name,
      totalStudents: students.length,
      maleCount,
      femaleCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncomeExpenseAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period, year, month } = req.query;

    const teachers = await Teacher.find({ user: userId });
    const students = await Student.find({ user: userId });
    const classes = await Class.find({ user: userId });

    let startDate, endDate;
    if (period === "monthly") {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    }

    const incomeExpenseByClass = classes.map((classItem) => {
      const classId = classItem._id;

      const filteredStudents = students.filter(
        (student) => String(student.class) === String(classId)
      );
      console.log(
        `Filtered students for class ${classItem.name}:`,
        filteredStudents
      );

      const totalFees = filteredStudents.reduce((sum, student) => {
        return sum + (student.feesPaid ? classItem.fees : 0);
      }, 0);

      const filteredTeachers = teachers.filter(
        (teacher) => String(teacher.assignedClass) === String(classId)
      );
      console.log(
        `Filtered teachers for class ${classItem.name}:`,
        filteredTeachers
      );

      const totalSalaries = filteredTeachers.reduce(
        (sum, teacher) => sum + teacher.salary,
        0
      );

      return {
        classId: classId,
        className: classItem.name,
        totalFees,
        totalSalaries,
      };
    });

    res.json({ incomeExpenseByClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
