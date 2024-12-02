import React, { useState, useEffect } from "react";
import "./CoursesPlaces.css"; // For styling the component
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal';  // Importing react-modal
import { fetchCourses } from "../../redux/actions/coursePlacesActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CoursesPlaces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.coursesPlaces.coursesPlaces);
  const username = useSelector((state) => state.auth.user?.username);

  const region = username === "ukadmin" ? "United Kingdom" : "United States";
  const regionfilter = username === "ukadmin" ? "uk" : "us";
  const coursesData = courses;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null); 

  const [filters, setFilters] = useState({
    category: '',
    title: '',
    location: '',
    date: '',
    price: '',
    visibility: '',
    practiceOption: '',
    practice_option: ''
  });

  const [formData, setFormData] = useState({
    date: "",
    availablePlaces: "",
    priceWithVat: "",
    priceExVat: "",
    depositAmount: "",
    visibility: "Shown",
    practiceOption: "Notspecified",
  });

  const openModal = (type, course = null) => {
    if (type === "newCourse") {
      navigate("/new-user"); // Redirect to /new-user
    } else {
      setModalType(type);
      setSelectedCourse(course);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setSelectedCourse(null);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="courses-places">
      <header>
        <p>{region}</p>
        <h1>COURSES & DATES</h1>

        <button className="add-date-btn" onClick={() => openModal("newCourse")}>Add new course</button>
      </header>
      <table className="courses-table">
      <thead>
  <tr>
    <th>Category
      <select name="category" onChange={handleFilterChange}>
        <option value="">All</option>
        {[...new Set(coursesData.filter(course => course.region === regionfilter).map(course => course.category))].map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </th>
    <th>Title
      <select name="title" onChange={handleFilterChange}>
        <option value="">All</option>
        {[...new Set(coursesData.filter(course => course.region === regionfilter).map(course => course.title))].map((title) => (
          <option key={title} value={title}>{title}</option>
        ))}
      </select>
    </th>
    <th>Duration
      <select name="duration" onChange={handleFilterChange}>
        <option value="">All</option>
        {[...new Set(coursesData.filter(course => course.region === regionfilter).map(course => course.duration))].map((duration) => (
          <option key={duration} value={duration}>{duration}</option>
        ))}
      </select>
    </th>
    <th>Location
      <select name="location" onChange={handleFilterChange}>
        <option value="">All</option>
        {[...new Set(coursesData.filter(course => course.region === regionfilter).map(course => course.location))].map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>
    </th>
    <th>Date
      <select name="price_with_vat" onChange={handleFilterChange}>
        <option value="">All</option>
        {coursesData.filter(course => course.region === regionfilter).map(course =>
          course.dates.map((dateInfo, index) => (
            <option key={`${course.title}-${index}`} value={dateInfo.date}>
              {dateInfo.date}
            </option>
          ))
        )}
      </select>
    </th>
    <th>Price
      <select name="price_with_vat" onChange={handleFilterChange}>
        <option value="">All</option>
        {coursesData.filter(course => course.region === regionfilter).map(course =>
          course.dates.map((dateInfo, index) => (
            <option key={`${course.title}-${index}`} value={dateInfo.price_with_vat}>
              {dateInfo.price_with_vat}
            </option>
          ))
        )}
      </select>
    </th>
    <th>Visibility
      <select name="visibility" onChange={handleFilterChange}>
        <option value="">All</option>
        {coursesData.filter(course => course.region === regionfilter).map(course =>
          course.dates.map((dateInfo, index) => (
            <option key={`${course.title}-${index}`} value={dateInfo.visibility}>
              {dateInfo.visibility}
            </option>
          ))
        )}
      </select>
    </th>
    <th>Practice option
      <select name="practice_option" onChange={handleFilterChange}>
        <option value="">All</option>
        {coursesData.filter(course => course.region === regionfilter).map(course =>
          course.dates.map((dateInfo, index) => (
            <option key={`${course.title}-${index}`} value={dateInfo.practice_option}>
              {dateInfo.practice_option}
            </option>
          ))
        )}
      </select>
    </th>
    <th># Places Available</th>
    <th># Places Booked</th>
    <th># Places Remaining</th>
    <th>Edit</th>
  </tr>
</thead>

    <tbody>
      {coursesData.filter(course => course.region === regionfilter).map((course) =>
        course.dates.map((dateInfo, index) => (
          <React.Fragment key={`${course.title}-${index}`}>
            <tr>
              {index === 0 && (
                <>
                  <td rowSpan={course.dates.length}>{course.category}</td>
                  <td rowSpan={course.dates.length}>{course.title}</td>
                  <td rowSpan={course.dates.length}>{course.duration}</td>
                  <td rowSpan={course.dates.length}>{course.location}</td>
                </>
              )}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span>{dateInfo.date}</span>
                  <button className="edit-link-btn" onClick={() => openModal("addDate", { ...dateInfo, courseId: course})} style={{ marginTop: '10px' }}>
                    Add New Date
                  </button>
                </div>
              </td>

              <td>{dateInfo.price_with_vat}</td>
              <td>
                {dateInfo.visibility === "Shownassoldout"
                  ? "Shown as sold out"
                  : dateInfo.visibility === "Shownaspublicholiday"
                  ? "Shown as public holiday"
                  : dateInfo.visibility === "Shown"
                  ? "Shown"
                  : dateInfo.visibility === "Hidden"
                  ? "Hidden"
                  : dateInfo.visibility}
              </td>
              <td>
                {dateInfo.practice_option === "Withmannequin"
                  ? "With mannequin"
                  : dateInfo.practice_option === "Withmannequin/model"
                  ? "With mannequin/model"
                  : dateInfo.practice_option === "Notspecified"
                  ? "Not Specified"
                  : dateInfo.practice_option === "Withmodel"
                  ? "With model"
                  : dateInfo.practice_option}
              </td>
              <td>{dateInfo.available_places}</td>
              <td>{dateInfo.booked_places}</td>
              <td>{dateInfo.remaining}</td>
              <td>
                <button
                  className="edit-link-btn"
                  onClick={() =>
                    openModal("editCourse", {
                      ...dateInfo, // Include all properties of dateInfo
                      date_id: dateInfo._id, // Add the date_id from dateInfo
                      courseId: dateInfo._id, // Include courseId
                    })
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))
      )}
    </tbody>
  </table>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
       {modalType === "addDate" && (
  <div>
    <h2>Add New Date</h2>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("sassoontoken");
        if (!token) {
          alert("Authentication token is missing.");
          return;
        }
        
        let courseId = selectedCourse.courseId.courseid;
        if (!courseId) {
          alert("Course ID is missing.");
          return;
        }

        const dataToSend = {
          date: formData.date,
          available_places: formData.availablePlaces,
          price_with_vat: formData.priceWithVat,
          price_ex_vat: formData.priceExVat,
          deposit_amount: formData.depositAmount,
          visibility: formData.visibility,
          practice_option: formData.practiceOption,
        };

        console.log("Sending data:", dataToSend);

        try {
          await axios.put(
            `${process.env.REACT_APP_API_URL}/api/coursesupdate/${courseId}`,
            dataToSend,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          alert("Date added successfully!");
          closeModal();
                } catch (error) {
                  console.error("Error adding date:", error.response || error.message || error);
                  alert("Failed to add date. Please try again.");
                }
              }}
            >

              <label>
                Date
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </label>
              <label>
                Places Available Online
                <input
                  type="number"
                  value={formData.availablePlaces}
                  onChange={(e) => setFormData({ ...formData, availablePlaces: e.target.value })}
                  required
                />
              </label>
              <label>
                Price (Inc. VAT)
                <input
                  type="number"
                  value={formData.priceWithVat}
                  onChange={(e) => setFormData({ ...formData, priceWithVat: e.target.value })}
                  required
                />
              </label>
              <label>
                Price (Ex. VAT)
                <input
                  type="number"
                  value={formData.priceExVat}
                  onChange={(e) => setFormData({ ...formData, priceExVat: e.target.value })}
                />
              </label>
              <label>
                Deposit Amount
                <input
                  type="number"
                  value={formData.depositAmount}
                  onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                  required
                />
              </label>
              <label>
                Visibility
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  required
                >
                  <option value="Shown">Shown</option>
                  <option value="Shownassoldout">Shown as sold out</option>
                  <option value="Shownaspublicholiday">Shown as public holiday</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </label>
              <label>
                Practice Option
                <select
                  value={formData.practiceOption}
                  onChange={(e) => setFormData({ ...formData, practiceOption: e.target.value })}
                  required
                >
                  <option value="Notspecified">Not specified</option>
                  <option value="Withmannequin">With mannequin</option>
                  <option value="Withmodel">With model</option>
                  <option value="Withmannequin/model">With mannequin/model</option>
                </select>
              </label>
              <button type="submit">Add Date</button>
            </form>
          </div>
        )}

{modalType === "editCourse" && selectedCourse && (
          <div>
            <h2>Edit Course</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const token = localStorage.getItem("sassoontoken");
                if (!token) {
                  alert("Authentication token is missing.");
                  return;
                }

                console.log('dateInfo',selectedCourse.courseId)

                const dataToSend = {
                  date: formData.date || selectedCourse.date,
                  available_places: formData.availablePlaces || selectedCourse.available_places,
                  price_with_vat: formData.priceWithVat || selectedCourse.price_with_vat,
                  price_ex_vat: formData.priceExVat || selectedCourse.price_ex_vat,
                  deposit_amount: formData.depositAmount || selectedCourse.deposit_amount,
                  visibility: formData.visibility || selectedCourse.visibility,
                  practice_option: formData.practiceOption || selectedCourse.practice_option,
                };

                try {
                  await axios.patch(
                    `${process.env.REACT_APP_API_URL}/api/dateupdate/${selectedCourse.courseId}`,
                    dataToSend,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  alert("Course updated successfully!");
                  closeModal();
                } catch (error) {
                  console.error("Error updating course:", error.response || error.message || error);
                  alert("Failed to update course. Please try again.");
                }
              }}
            >
              <label>
                Date
                <input
                  type="text"
                  defaultValue={selectedCourse.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </label>
              <label>
                Places Available Online
                <input
                  type="number"
                  defaultValue={selectedCourse.available_places}
                  onChange={(e) => setFormData({ ...formData, availablePlaces: e.target.value })}
                  required
                />
              </label>
              <label>
                Price (Inc. VAT)
                <input
                  type="number"
                  defaultValue={selectedCourse.price_with_vat}
                  onChange={(e) => setFormData({ ...formData, priceWithVat: e.target.value })}
                  required
                />
              </label>
              <label>
                Price (Ex. VAT)
                <input
                  type="number"
                  defaultValue={selectedCourse.price_ex_vat}
                  onChange={(e) => setFormData({ ...formData, priceExVat: e.target.value })}
                />
              </label>
              <label>
                Deposit Amount
                <input
                  type="number"
                  defaultValue={selectedCourse.deposit_amount}
                  onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                  required
                />
              </label>
              <label>
                Visibility
                <select
                  defaultValue={selectedCourse.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  required
                >
                  <option value="Shown">Shown</option>
                  <option value="Shownassoldout">Shown as sold out</option>
                  <option value="Shownaspublicholiday">Shown as public holiday</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </label>
              <label>
                Practice Option
                <select
                  defaultValue={selectedCourse.practice_option}
                  onChange={(e) => setFormData({ ...formData, practiceOption: e.target.value })}
                  required
                >
                  <option value="Notspecified">Not specified</option>
                  <option value="Withmannequin">With mannequin</option>
                  <option value="Withmodel">With model</option>
                  <option value="Withmannequin/model">With mannequin/model</option>
                </select>
              </label>
              <button type="submit">Update Course</button>
            </form>
          </div>
        )}

        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CoursesPlaces;
