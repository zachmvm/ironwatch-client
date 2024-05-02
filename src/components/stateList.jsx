import React, { useEffect, useState } from "react";
import { backendURL } from "../utilities/constant";
import axios from "axios";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import AddEmployeModal from "../modales/addEmployesmodal";
import { useNavigate } from "react-router-dom";

const StateList = () => {
  const navigate = useNavigate();
  const statesList = [
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

  const [states, setStates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [AddEmploye, setAddEmploye] = useState(false);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/employees`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      const filteredStates = statesList.filter((state) =>
        employees.some((employee) => employee.state === state),
      );
      setStates(filteredStates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees]);

  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
            Iron Watch Employees
          </Typography>
          <Button variant="contained" onClick={() => setAddEmploye(true)}>
            Add New Employee
          </Button>
        </Box>
        {states.map((state) => {
          const filterByState = employees.filter(
            (item) => item.state === state,
          );
          return (
            <Box key={state} mt={2}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                State: {state}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filterByState.map((item, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid #ccc",
                      p: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                        {" "}
                        {item.firstName} {item.lastName}
                      </Typography>
                      <Typography>{item.email}</Typography>
                      <Typography>{item.phoneNumber}</Typography>
                    </Box>
                    <IconButton
                      sx={{ fontSize: "18px", gap: 2, borderRadius: 0 }}
                      onClick={() => navigate("/documents/" + item._id)}
                      color="primary"
                    >
                      View Document
                      <ArrowForward />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>

      <AddEmployeModal
        isOpen={AddEmploye}
        handleClose={() => setAddEmploye(false)}
      />
    </Box>
  );
};

export default StateList;
