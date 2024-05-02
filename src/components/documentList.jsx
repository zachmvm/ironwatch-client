import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../utilities/constant";
import {
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AddDocumentModal from "../modales/addDocumentModal";
import { useParams } from "react-router-dom";

const DocumentList = () => {
  const params = useParams();
  const [documents, setDocuments] = useState([]);
  const [addDocumentOpen, setAddDocumentOpen] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const employeeId = params.employeeId;
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const employeeResponse = await axios.get(
          `${backendURL}/api/employees/${employeeId}`,
        );
        setEmployee(employeeResponse.data);
        const documentsResponse = await axios.get(
          `${backendURL}/api/documents`,
        );
        setDocuments(documentsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDocuments();
  }, [employeeId]);

  const filteredDocuments = documents.filter(
    (item) => item.owner === employeeId,
  );
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          padding: 20,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <a href="/">
              <IconButton>
                <ArrowBack />
              </IconButton>
            </a>
            <Typography fontSize={"28px"} fontWeight={"bold"}>
              {employee?.firstName} - {employee?.lastName} / Documents
            </Typography>
          </Box>
          <Button variant="contained" onClick={() => setAddDocumentOpen(true)}>
            Add Document
          </Button>
        </Box>
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document, index) => (
            <Box
              display={"flex"}
              sx={{
                border: "1px solid #ccc",
                p: 1,
                borderRadius: 1,
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#4D5463",
                  fontSize: "20px",

                  fontWeight: "bold",
                }}
              >
                {document.title}
              </Typography>
              <Typography>License Number: {document?.licenseNumber}</Typography>
              <Typography>
                License Expiry Date: {document?.licenseExpiryDate}
              </Typography>
              {document?.file ? (
                <a href={document.file} target="_blank" rel="noopener noreferrer">
                  <Button>open Document</Button>
                </a>
              ) : (
                <Typography>No File Found</Typography>
              )}
            </Box>
          ))
        ) : (
          <Typography>No documents found</Typography>
        )}
      </div>

      <AddDocumentModal
        selectedEmploye={employeeId}
        handleClose={() => setAddDocumentOpen(false)}
        isOpen={addDocumentOpen}
      />
    </>
  );
};

export default DocumentList;
