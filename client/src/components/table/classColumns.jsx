import { Link, Typography } from "@mui/material";
import { useTeachers } from "../../context/TeachersContext";

const FindTeacherName = (teacherId) => {
  const { teachers } = useTeachers();

  // console.log(teacherId, teachers);

  const teacher = teachers.find((t) => t._id === teacherId);

  return <Typography>{teacher?.name}</Typography>;
};

const classColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "Teacher",
    accessor: "teacher",
    Cell: ({ value }) => FindTeacherName(value),
  },
  {
    Header: "Fees",
    accessor: "fees",
  },
];

export default classColumns;
