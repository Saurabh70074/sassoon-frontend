import React, { useState } from "react";
import axios from "axios";
import './CourseForm.css'; // Import the CSS file for styling

const token = localStorage.getItem("sassoontoken");

const CourseForm = () => {
  const [formData, setFormData] = useState({
    courseid: "",
    region: "",
    category: "",
    title: "",
    duration: "",
    location: "",
    dates: [
      {
        date: "",
        price_with_vat: "",
        visibility: "",
        practice_option: "",
        places: "",
        booked_places: "",
        available_places: "",
        currency: "",
        deposit_amount: "",
        price_without_vat: "",
      },
    ],
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (name.includes("dates")) {
      const dateIndex = parseInt(name.split("-")[1]);
      const fieldName = name.split("-")[0];
      updatedFormData.dates[dateIndex][fieldName] = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     

      console.log(token)

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/courses`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token as Bearer token
          },
        }
      );
      
      console.log("Course added successfully:", response.data);
      alert("Course added successfully!");

      // Reset form after successful submission
      setFormData({
        courseid: "",
        region: "",
        category: "",
        title: "",
        duration: "",
        location: "",
        dates: [
          {
            date: "",
            price_with_vat: "",
            visibility: "",
            practice_option: "",
            places: "",
            booked_places: "",
            available_places: "",
            currency: "",
            deposit_amount: "",
            price_without_vat: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Error adding course, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="modal-header">
        <h2>Add Course</h2>
      </div>

      <div className="form-grid">
        <div>
          <label>Course ID</label>
          <input
            type="text"
            name="courseid"
            value={formData.courseid}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stripe Account</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="uk">VS Salons</option>
            <option value="us">Sassoon Academy NA</option>
          </select>
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">Submit Course</button>
      </div>
    </form>
  );
};

export default CourseForm;
