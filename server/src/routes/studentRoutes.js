const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, studentController.getAllStudents);
router.get("/:id", protect, studentController.getStudentById);
router.post("/", protect, studentController.createStudent);
router.put("/:id", protect, studentController.updateStudent);
router.delete("/:id", protect, studentController.deleteStudent);

module.exports = router;
