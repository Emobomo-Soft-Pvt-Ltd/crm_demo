import axios from "axios";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/BulkData.css";

function BulkDataImport() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:8081/bulkdata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Bulk data uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Error uploading bulk data.");
    }
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="containerrr pt-20">
          <header>Bulk Data Import</header>
          <form>
            <div className="form first">
              <div className="details personal">
                <div className="fields">
                  <div className="input-fields">
                    <label>Upload File:</label>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button onClick={handleUpload}>Upload</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BulkDataImport;
