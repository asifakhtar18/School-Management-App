import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomeExpenseAnalytics = () => {
  const [data, setData] = useState(null);
  const [view, setView] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/analytics/income-expense", {
        params: { period: view, year, month },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view, year, month]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Income and Expense Analytics</h1>
      <div>
        <label>
          View:
          <select value={view} onChange={(e) => setView(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
        {view === "monthly" && (
          <>
            <label>
              Month:
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                min="1"
                max="12"
              />
            </label>
          </>
        )}
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="2000"
            max="2100"
          />
        </label>
      </div>
      <p>Income: {data.income}</p>
      <p>Expense: {data.expense}</p>
      {/* Add graph visualization here */}
    </div>
  );
};

export default IncomeExpenseAnalytics;
