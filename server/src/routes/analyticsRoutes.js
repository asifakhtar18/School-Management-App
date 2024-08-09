const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/class/:id", protect, analyticsController.getClassAnalytics);
router.get(
  "/income-expense",
  protect,
  analyticsController.getIncomeExpenseAnalytics
);

module.exports = router;
