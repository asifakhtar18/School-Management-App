const teacherColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Date of Birth",
    accessor: "dob",
    Cell: ({ value }) => new Date(value).toLocaleDateString("en-US"),
  },
  {
    Header: "Contact Details",
    accessor: "contactDetails",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
  {
    Header: "Assigned Class",
    accessor: "assignedClass",
    Cell: ({ value }) => value?.name,
  },
];

export default teacherColumns;
