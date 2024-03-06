import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/Department.css";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

function Department() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState({});
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/department")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEditClick = (index) => {
    setEditing(true);
    setEditIndex(index);
    setValues({ department_name: data[index].department_name });
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditIndex(null);
    setValues({});
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
  
    if (editing) {
      // If editing, update the existing department
      axios
        .put(`http://localhost:8081/department/${data[editIndex].id}`, values)
        .then((response) => {
          alert("Department Updated Successfully");
          console.log(response);
  
          // Update the local state with the new data
          const updatedData = [...data];
          updatedData[editIndex].department_name = values.department_name;
          setData(updatedData);
  
          // Reset values and editing state
          setEditing(false);
          setEditIndex(null);
          setValues({});
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If not editing, add a new department
      axios
        .post("http://localhost:8081/department", values)
        .then((response) => {
          alert("Department Added Successfully");
          console.log(response);
  
          // Update the local state with the new data
          setData([...data, response.data]);
  
          // Reset values and editing state
          setEditing(false);
          setEditIndex(null);
          setValues({});
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  const handleDelete = (index) => {
    axios
      .delete(`http://localhost:8081/department/${data[index].id}`)
      .then((response) => {
        alert("Department Deleted Successfully");
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        <h5 className="main-title">Department</h5>
        <div className="inner_content">
          <div className="sub_content">
            <h6>Add Department</h6>
            <hr />
            <h6>Department Name</h6>
            <input
              type="text"
              required
              onChange={(e) => {
                setValues({ ...values, department_name: e.target.value });
              }}
            />
            <div className="buttons">
              <button className="button" onClick={handleSubmitClick}>
                <FaCheck /> save
              </button>
              <button className="button" >cancel</button>
            </div>
          </div>
          <div className="sub_content">
            <h5>Department List</h5>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((department, index) => {
                  return (
                    <tr key={index} className="tbody">
                      <td>
                        {editing && editIndex === index ? (
                          <input
                            type="text"
                            value={values.department_name || ""}
                            onChange={(e) => {
                              setValues({
                                ...values,
                                department_name: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          department.department_name
                        )}
                      </td>
                      <td className="action-buttons">
                        {editing && editIndex === index ? (
                          <>
                            <button
                              className="button"
                              onClick={handleSubmitClick}
                            >
                              Edit
                            </button>
                            <button
                              className="button"
                              onClick={handleCancelClick}
                            >
                              cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <FaEdit
                              size={20}
                              color="blue"
                              onClick={() => handleEditClick(index)}
                            />
                            <FaTrash
                              size={20}
                              color="blue"
                              onClick={() => handleDelete(index)}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
