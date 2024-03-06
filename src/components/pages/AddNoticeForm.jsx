import React, { useState } from "react";
import "./css/AddNoticeForm.css"; // Create a CSS file for styling the form
import axios from "axios";

function AddNoticeForm({ onClose }) {
  const [values, setValues] = useState({
    title: "",
    file: null,
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("file", values.file);
    formData.append("date", values.date);
  
    try {
      const response = await axios.post("http://localhost:8081/notice", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  
    // Close the form
    onClose();
  };
  

  return (
    <div className="add-notice-form">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => {
            setValues({ ...values, title: e.target.value });
          }}
        />
        
        <label>File:</label>
        <input
          type="file"
          onChange={(e) => {
            setValues({ ...values, file: e.target.files[0] });
          }}
        />
        <label>Date:</label>
        <input
          type="date"
          value={values.date}
          onChange={(e) => {
            setValues({ ...values, date: e.target.value });
          }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddNoticeForm;
