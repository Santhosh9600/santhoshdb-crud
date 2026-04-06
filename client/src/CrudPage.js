import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function CrudPage() {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // INSERT
  const addFoodData = () => {
    if (!foodName || !description) {
      alert("Please enter all fields");
      return;
    }

    Axios.post("https://santhoshdb-crud.onrender.com/insert", {
      foodname: foodName, // ✅ FIX
      description,
    })
      .then((res) => {
        console.log("Inserted:", res.data);
        fetchData();
        setFoodName("");
        setDescription("");
      })
      .catch((err) => {
        console.log("Insert Error:", err);
      });
  };

  // READ
  const fetchData = () => {
    Axios.get("https://santhoshdb-crud.onrender.com/read")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setFoodList(response.data);
      })
      .catch((err) => {
        console.log("Fetch Error:", err);
      });
  };

  // UPDATE
  const updateFood = (id) => {
    if (!newFoodName) {
      alert("Enter new food name");
      return;
    }

    Axios.put("https://santhoshdb-crud.onrender.com/update", {
      id,
      newfoodName: newFoodName, // ✅ FIX
    })
      .then(() => {
        console.log("Updated");
        fetchData();
      })
      .catch((err) => console.log("Update Error:", err));
  };

  // DELETE
  const deleteFood = (id) => {
    Axios.delete(`https://santhoshdb-crud.onrender.com/delete/${id}`)
      .then(() => {
        console.log("Deleted");
        fetchData();
      })
      .catch((err) => console.log("Delete Error:", err));
  };

  return (
    <div className="container">
      <h1>Fruits Name</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Food Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-primary" onClick={addFoodData}>
          Add Food
        </button>
      </div>

      <h3>View Details</h3>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {foodList.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            foodList.map((val) => (
              <tr key={val._id}>
                <td>{val.foodname}</td> {/* ✅ FIX */}
                <td>{val.description}</td>

                <td>
                  <input
                    type="text"
                    placeholder="Update name"
                    onChange={(e) => setNewFoodName(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    onClick={() => updateFood(val._id)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFood(val._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CrudPage;