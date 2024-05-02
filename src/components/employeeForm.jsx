// a form for adding or editing employee information

import React from "react";
import axios from "axios";
import { backendURL } from "../utilities/constant";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  Select,
  FormHelperText,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

const SingleForm = ({ formik }) => {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <div style={{ width: "100%" }}>
      <FormControl
        sx={{ margin: "0px !important", minWidth: "100%" }}
        error={formik.touched.state && formik.errors.state}
      >
        <InputLabel id="state">State</InputLabel>
        <Select
          labelId="state"
          id="state"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          autoWidth
          label="State"
        >
          {states.map((state) => (
            <MenuItem value={state}>{state}</MenuItem>
          ))}
        </Select>
        {formik.touched.state && formik.errors.state ? (
          <FormHelperText>{formik.errors.state}</FormHelperText>
        ) : null}
      </FormControl>
    </div>
  );
};

const EmployeeForm = ({ handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    state: Yup.string().required("State is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      state: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values, "values");
      try {
        // Send data to the backend to create a new employee
        await axios.post(`${backendURL}/api/employees`, values);
        // Reset form fields after successful submission
        resetForm();
        window.location.href = "/";
      } catch (error) {
        enqueueSnackbar({
          message: `${error.response.data.message}`,
          variant: "error",
        });
        console.error("Error creating employee:", error);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2>Add Employee</h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          {...formik.getFieldProps("firstName")}
          error={formik.touched.firstName && formik.errors.firstName}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          {...formik.getFieldProps("lastName")}
          error={formik.touched.lastName && formik.errors.lastName}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          {...formik.getFieldProps("phoneNumber")}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        <SingleForm formik={formik} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EmployeeForm;
