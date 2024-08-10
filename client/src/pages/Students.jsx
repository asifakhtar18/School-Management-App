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
import { motion } from "framer-motion";

export default function Students() {
  const [data, setData] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [classData, setClassData] = useState([]);

  console.log(data);

  const { openModal, setOpenModal } = useApp();

  const { students, page, count, handleDeleteStudent } = useStudent();
  const { classes } = useClasses();

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
      <Box
        component={motion.div}
        initial={{ opacity: 0.3, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Table
          data={data || []}
          page={page}
          count={count}
          columns={studentColumns}
          onEdit={setCurrentStudent}
          onDelete={handleDeleteStudent}
        />
      </Box>
    </Box>
  );
}
