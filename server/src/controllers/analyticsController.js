const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

exports.getClassAnalytics = async (req, res) => {
  try {
    const class_ = await Class.findById(req.params.id).populate(
      "teacher students"
    );
    const maleCount = class_.students.filter(
      (student) => student.gender === "Male"
    ).length;
    const femaleCount = class_.students.filter(
      (student) => student.gender === "Female"
    ).length;
    res.json({ ...class_.toObject(), maleCount, femaleCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncomeExpenseAnalytics = async (req, res) => {
  try {
    const { period, year, month } = req.query;

    const teachers = await Teacher.find();
    const students = await Student.find();

    let income = 0;
    let expense = 0;

    if (period === "monthly") {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      income = students
        .filter(
          (student) =>
            new Date(student.createdAt) >= startDate &&
            new Date(student.createdAt) <= endDate
        )
        .reduce((sum, student) => sum + student.feesPaid, 0);
      expense = teachers
        .filter(
          (teacher) =>
            new Date(teacher.createdAt) >= startDate &&
            new Date(teacher.createdAt) <= endDate
        )
        .reduce((sum, teacher) => sum + teacher.salary, 0);
    } else {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      income = students
        .filter(
          (student) =>
            new Date(student.createdAt) >= startDate &&
            new Date(student.createdAt) <= endDate
        )
        .reduce((sum, student) => sum + student.feesPaid, 0);
      expense = teachers
        .filter(
          (teacher) =>
            new Date(teacher.createdAt) >= startDate &&
            new Date(teacher.createdAt) <= endDate
        )
        .reduce((sum, teacher) => sum + teacher.salary, 0);
    }

    res.json({ income, expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
