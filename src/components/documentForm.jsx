import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  FormControl,
  styled,
  Typography,
} from "@mui/material";
import { backendURL } from "../utilities/constant";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DocumentForm = ({ handleClose, employeId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    formik.setFieldValue("file", event.target.files[0]);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    owner: Yup.string().required("Owner is required"),
    licenseNumber: Yup.string().required("License Number is required"),
    licenseExpiryDate: Yup.string().required("License Expiry Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      licenseNumber: "",
      licenseExpiryDate: "",
      owner: employeId, // Should be set to the ID of the selected employee
      file: null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("title", values.title);
        formData.append("licenseNumber", values.licenseNumber);
        formData.append("licenseExpiryDate", values.licenseExpiryDate);
        formData.append("owner", values.owner);

        await axios.post(`${backendURL}/api/documents`, formData);

        // Reset form fields after successful submission
        resetForm();
        handleClose();
      } catch (error) {
        console.error("Error creating/editing document:", error);
        // Handle error here, e.g., show an error message to the user
      }
    },
  });

  return (
    <Box>
      <Typography mb={2} variant={"h6"}>
        Add Document
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <Box>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps("title")}
            error={formik.touched.title && formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Box>
        <Box>
          <TextField
            label="License Number"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps("licenseNumber")}
            error={formik.touched.licenseNumber && formik.errors.licenseNumber}
            helperText={
              formik.touched.licenseNumber && formik.errors.licenseNumber
            }
          />
        </Box>
        <Box>
          <TextField
            label="License Expiry Date"
            variant="outlined"
            type="date"
            fullWidth
            {...formik.getFieldProps("licenseExpiryDate")}
            error={
              formik.touched.licenseExpiryDate &&
              formik.errors.licenseExpiryDate
            }
            helperText={
              formik.touched.licenseExpiryDate &&
              formik.errors.licenseExpiryDate
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box>
          <FormControl>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              size="medium"
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <Typography mt={2}>{`File: ${selectedFile.name}`}</Typography>
            )}
          </FormControl>
        </Box>

        <Box mt={2}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DocumentForm;
