import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useApp } from "../../context/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  height: "100vh",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ children }) {
  const { openModal, setOpenModal } = useApp();
  const handleClose = () => setOpenModal(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Modal open={openModal} onClose={handleClose} sx={style}>
        {children}
      </Modal>
    </Box>
  );
}
