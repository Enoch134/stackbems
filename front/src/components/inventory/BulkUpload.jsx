import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Modal } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Papa from "papaparse";

// ... (your imports)

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [columnsPreview, setColumnsPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        const array = csvOutput.toString().split("\r\n");
        const heading = array[0].split(",");

        setColumnsPreview(heading);
      };

      fileReader.readAsText(selectedFile);
    } else {
      setColumnsPreview([]);
    }
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      const formData = new FormData();
      formData.append("uploadfile", file);
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
      const response = await axios.post(
        "http://localhost:2024/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader
          }
        }
      );

      setUploadStatus({
        success: true,
        message: response.data.message,
      });
    } catch (error) {
      console.error("Error during bulk upload:", error);
      setUploadStatus({
        success: false,
        message: "Error during bulk upload. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 justify-center h-screen bg-cover bg-center bg-opacity-100">
      <Container maxWidth="md">
        <div>
          <div className="bg-white rounded shadow-2xl p-4 px-4 md:p-8 mb-6">
            <form>
              {/* ... (other form elements) */}
              <div className="md:col-span-5">
                <label htmlFor="csvFileInput">File Name</label>
                <input
                  type="file"
                  name="uploadfile"
                  className="h-15 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="choose a file"
                  id="csvFileInput"
                  accept=".csv"
                  onChange={handleOnChange}
                />
              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    id="uploadButton"
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? "Uploading..." : "Upload File"}
                  </Button>
                </div>
              </div>
              {/* ... (other form elements) */}
            </form>

            {uploadStatus && (
              <div className="mt-4">
                {uploadStatus.success ? (
                  <DoneOutlineIcon color="success" />
                ) : (
                  <ErrorIcon color="error" />
                )}
                <Typography variant="body2" className="ml-2">
                  {uploadStatus.message}
                </Typography>
              </div>
            )}

            {/* ... (other content) */}
            {columnsPreview.length > 0 && (
              <div className="mt-4">
                <Typography variant="h6" className="text-lg font-medium mb-2">
                  Columns Preview:
                </Typography>
                <ul>
                  {columnsPreview.map((column, index) => (
                    <li key={index}>{column}</li>
                  ))}
                </ul>
                <Typography variant="body2" className="text-red-500 font-bold">
                  Import only new items for your inventory. Importing existing
                  items will result in duplicates.
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BulkUpload;


