import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ClassAnalytics = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const token = JSON.parse(localStorage.getItem("user")).token;

  const fetchClassData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/analytics/class/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, [id]);

  if (!classData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Class Analytics</h1>
      <p>Name: {classData.name}</p>
      <p>Year: {classData.year}</p>
      <p>Teacher: {classData.teacher.name}</p>
      <p>Students: {classData.students.length}</p>
      <p>Male Students: {classData.maleCount}</p>
      <p>Female Students: {classData.femaleCount}</p>
    </div>
  );
};

export default ClassAnalytics;
