const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, classController.getAllClasses);
router.get("/:id", protect, classController.getClassById);
router.post("/", protect, classController.createClass);
router.put("/:id", protect, classController.updateClass);
router.delete("/:id", protect, classController.deleteClass);

module.exports = router;
