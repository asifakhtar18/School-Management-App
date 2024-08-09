import { useState, useEffect } from "react";
import StudentForm from "../components/forms/StudentForm";
import { useClasses } from "../context/ClassContext";
import Table from "../components/table/Table";
import studentColumns from "../components/table/studentColumns";
import { Box } from "@mui/material";
import BasicModal from "../components/modals/Modal";
import TableHeading from "../components/TableHeading";
import { useApp } from "../context/AppContext";
import { useStudent } from "../context/StudentContext";

export default function Students() {
  const [data, setData] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [classData, setClassData] = useState([]);

  const { openModal, setOpenModal } = useApp();

  const { students, page, count, handleDeleteStudent } = useStudent();
  const { classes } = useClasses();

  console.log(students, page, count, classes);

  useEffect(() => {
    setClassData(classes);
  }, [classes]);

  useEffect(() => {
    setData(students);
  }, [students]);

  return (
    <Box>
      <BasicModal openModal={openModal}>
        <StudentForm
          currentStudent={currentStudent}
          setCurrentStudent={setCurrentStudent}
          classes={classData || []}
        />
      </BasicModal>
      <TableHeading
        btnName="Add Student"
        heading="Students"
        onclick={() => setOpenModal(true)}
      />
      <Table
        data={data || []}
        page={page}
        count={count}
        columns={studentColumns}
        onEdit={setCurrentStudent}
        onDelete={handleDeleteStudent}
      />
    </Box>
  );
}
