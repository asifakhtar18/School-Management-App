const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, teacherController.getAllTeachers);
router.get("/:id", protect, teacherController.getTeacherById);
router.post("/", protect, teacherController.createTeacher);
router.put("/:id", protect, teacherController.updateTeacher);
router.delete("/:id", protect, teacherController.deleteTeacher);

module.exports = router;
