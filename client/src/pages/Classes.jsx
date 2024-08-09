import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import Table from "../components/table/Table";
import ClassForm from "../components/forms/ClassForm";
import classColumns from "../components/table/classColumns";

import { useTeachers } from "../context/TeachersContext";
import { useClasses } from "../context/ClassContext";

import { getAllClasses, deleteClass } from "../services/classServices";
import TableHeading from "../components/TableHeading";
import BasicModal from "../components/modals/Modal";
import { useApp } from "../context/AppContext";

export default function Classes() {
  const [data, setData] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  console.log(data);
  const { teachers } = useTeachers();
  const { openModal, setOpenModal } = useApp();
  const { classes, page, setPage, count, handleDeleteClass } = useClasses();

  const assignTeacher = () => {
    if (data?.length > 0) {
      data.map((row) => {
        if (row?.teacher) {
          teachers?.map((teacher) => {
            if (teacher?._id === row?.teacher) {
              row.teacher = teacher.name;
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    setData(classes);
  }, [classes]);

  useEffect(() => {
    assignTeacher();
  }, [teachers]);

  return (
    <Box>
      <BasicModal openModal={openModal}>
        <ClassForm
          currentClass={currentClass}
          setCurrentClass={setCurrentClass}
          teachers={teachers}
        />
      </BasicModal>
      <TableHeading
        btnName="Add Class"
        heading="Classes"
        onclick={() => setOpenModal(true)}
      />

      <Table
        data={data ? data : []}
        columns={classColumns}
        count={count}
        page={page}
        onPageChange={setPage}
        onEdit={(row) => setCurrentClass(row)}
        onDelete={(id) => handleDeleteClass(id)}
      />
    </Box>
  );
}
