import { Link } from "@mui/material";

import { useNavigate } from "react-router-dom";

const GoToClass = (data) => {
  const navigate = useNavigate();
  return (
    <Link
      component="button"
      sx={{
        cursor: "pointer",
        color: "#202020",
        textDecoration: "none",
        fontWeight: "600",
      }}
      variant="body2"
      onClick={() => navigate(`/class/${data._id}`)}
    >
      {data.name}
    </Link>
  );
};

const classColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => GoToClass(row.original),
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "Teacher",
    accessor: "teacher",
    Cell: ({ value }) => value?.name,
  },
  {
    Header: "Fees",
    accessor: "fees",
  },
];

export default classColumns;
