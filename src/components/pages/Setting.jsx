// Import necessary libraries
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/Setting.css";

function Setting({ changeLogo }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoImage, setLogoImage] = useState(null);
  const [error, setError] = useState(null);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  // const [scheduledEmails, setScheduledEmails] = useState([]);

  useEffect(() => {
    const fetchInitialLogo = async () => {
      try {
        const response = await axios.get("http://localhost:8081/logo");
        console.log("Logo Data:", response.data); // Log the received data
        setLogoImage(response.data.logo_image);
      } catch (err) {
        console.error("Axios Error:", err);
        setError(
          "An error occurred while fetching the logo. Please try again."
        );
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    // Fetch the initial logo only after the component has mounted
    fetchInitialLogo();
  }, []); // Empty dependency array to run only once on mount

  // useEffect(() => {
  //   const fetchScheduledEmails = async () => {
  //     try {
  //       const scheduledEmailsResponse = await axios.get(
  //         "http://localhost:8081/scheduled-emails"
  //       );
  //       console.log("Scheduled Emails Data:", scheduledEmailsResponse.data);
  //       setScheduledEmails(scheduledEmailsResponse.data);
  //     } catch (err) {
  //       console.error("Axios Error:", err);
  //       // setError("An error occurred while fetching scheduled emails. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchScheduledEmails();
  // }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("logo_image", file);

      const response = await axios.post("http://localhost:8081/logo", formData);
      console.log("Upload Logo Response:", response.data); // Log the response

      setLogoImage(response.data.logo_image);
      setError(null);
      alert("Logo Uploaded successfully");
      window.location.reload();
    } catch (err) {
      console.error("Axios Error:", err);
      setError("An error occurred while uploading the logo. Please try again.");
    }
  };

  if (loading) {
    // You can render a loading indicator while the logo is being fetched
    return <div>Loading...</div>;
  }

  const handleSchedule = async () => {
    try {
   // Validate hours and minutes here

    // Construct the cron expression
      const cronExpression = `${minutes} ${hours} * * *`;

     // Make a POST request to your server with the constructed cron expression
      await axios.post("http://localhost:8081/schedule-emails", {
        scheduleTime: cronExpression,
      });
// alert("Scheduled Successfully")   

  console.log("Scheduled emails successfully");
    } catch (error) {
      console.error("Error scheduling emails:", error);
      // alert("Scheduled Unsuccessfull")
    }
  };

  return (
    <div className="dashboard">
      <Sidebar logoImage={logoImage} />
      <div className="content">
        <Header />
        <div className="containerrr pt-20">
          <form className="setting-form" encType="multipart/form-data">
            {error && <div className="error-message">{error}</div>}
            <div className="input-field">
              <label>Upload Logo</label>
              <br />
              <input
                type="file"
                name="logo_image"
                accept="image/*"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="buttons setting-button">
              <button onClick={handleClick} className="submit">
                <span className="submit">Submit</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          </form>
          {/* <div>
            <label>
              Hours:
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </label>
            <label>
              Minutes:
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </label>
            <button onClick={handleSchedule}>Schedule Emails</button>
          </div>
          <div>
            <h2>Scheduled Emails</h2>
            <table>
              <thead>
                <tr>
                  <th>Schedule Time</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {scheduledEmails.map((scheduledEmail) => (
                  <tr key={scheduledEmail.id}>
                    <td>{scheduledEmail.schedule_time}</td>
                    <td>{scheduledEmail.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Setting;
