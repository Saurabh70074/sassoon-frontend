import axios from "axios";

// Define action types
export const FETCH_COURSE_REQUEST = "FETCH_COURSE_REQUEST";
export const FETCH_COURSE_SUCCESS = "FETCH_COURSE_SUCCESS";
export const FETCH_COURSE_FAILURE = "FETCH_COURSE_FAILURE";

// Action to fetch courses from the API
export const fetchCourses = () => async (dispatch) => {
  dispatch({ type: FETCH_COURSE_REQUEST }); // Log loading state

  try {
    const token = localStorage.getItem('sassoontoken');
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/allcourses`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({
      type: FETCH_COURSE_SUCCESS,
      payload: response.data || [],
    });
  } catch (error) {
    console.error("Error fetching courses:", error);

    dispatch({
      type: FETCH_COURSE_FAILURE,
      payload: error.message || "Failed to fetch courses",
    });
  }
};

