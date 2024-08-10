import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import TeacherForm from "../components/forms/TeacherForm";
import teacherColumns from "../components/table/teacherColumns";
import { useClasses } from "../context/ClassContext";
import Table from "../components/table/Table";
import { useTeachers } from "../context/TeachersContext";
import LargeButton from "../components/buttons/LargeButton";
import Modal from "../components/modals/Modal";
import { useApp } from "../context/AppContext";

export default function Teacher() {
  const [data, setData] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [classData, setClassData] = useState([]);
  const { classes } = useClasses();

  const { teachers, page, setPage, count, handleDeleteTeacher } = useTeachers();

  const { openModal, setOpenModal } = useApp();

  useEffect(() => {
    setClassData(classes);
  }, [classes]);

  useEffect(() => {
    setData(teachers);
  }, [teachers]);

  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <Box>
      <Modal openModal={openModal}>
        <TeacherForm
          currentTeacher={currentTeacher}
          setCurrentTeacher={setCurrentTeacher}
          classes={classData}
        />
      </Modal>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: "20px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "gray" }}>
          Teachers
        </Typography>
        <LargeButton
          bgClr="#5af2944"
          color="white"
          name="Add Teacher"
          onClick={handleClick}
        />
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0.3, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Table
          data={data}
          columns={teacherColumns}
          page={page}
          count={count}
          onPageChange={setPage}
          onEdit={(data) => setCurrentTeacher(data)}
          onDelete={handleDeleteTeacher}
        />
      </Box>
    </Box>
  );
}
