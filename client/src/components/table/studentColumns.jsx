function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const studentColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ value }) => capitalizeWords(value),
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Date of Birth",
    accessor: "dob",
    Cell: ({ value }) => new Date(value).toLocaleDateString(),
  },
  {
    Header: "Contact Details",
    accessor: "contactDetails",
  },
  {
    Header: "Fees Paid",
    accessor: "feesPaid",
    Cell: ({ value }) => (value ? "Yes" : "No"),
  },
  {
    Header: "Class Enrolled",
    accessor: "class",
    Cell: ({ value }) => value?.name,
  },
];

export default studentColumns;
