import { Link } from "@mui/material";

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
    Cell: ({ value }) => value?.name,
  },
  {
    Header: "Fees",
    accessor: "fees",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => <Link href={`/class/${row.original._id}`}>View</Link>,
  },
];

export default classColumns;
