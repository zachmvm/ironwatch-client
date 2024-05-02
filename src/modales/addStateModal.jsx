import { Modal, Typography, Box, Button } from "@mui/material";
import { backendURL } from "../utilities/constant";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import EmployeeForm from "../components/employeeForm";
import StateForm from "../components/stateForm";

const AddStateModal = ({ isOpen, handleClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 24,
          padding: 5,
          borderRadius: 4,
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflow: "auto",
          width: "360px",
        }}
      >
        <StateForm handleClose={handleClose}/>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ width: "100%", mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AddStateModal;
