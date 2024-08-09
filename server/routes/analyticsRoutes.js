const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/class/:id", analyticsController.getClassAnalytics);
router.get("/income-expense", analyticsController.getIncomeExpenseAnalytics);

module.exports = router;
