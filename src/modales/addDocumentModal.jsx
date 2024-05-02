import { Modal, Box, Button } from "@mui/material";
import DocumentForm from "../components/documentForm";

const AddDocumentModal = ({ isOpen, handleClose, selectedEmploye }) => {
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
          padding: 3,
          borderRadius: 4,
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflow: "auto",
          width: "360px",
        }}
      >
        <DocumentForm handleClose={handleClose} employeId={selectedEmploye} />
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

export default AddDocumentModal;
