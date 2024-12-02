import axios from 'axios';

export const FETCH_COURSE_REQUEST = "FETCH_COURSE_REQUEST";
export const FETCH_COURSE_SUCCESS = "FETCH_COURSE_SUCCESS";
export const FETCH_COURSE_FAILURE = "FETCH_COURSE_FAILURE";

export const fetchCourses = () => async (dispatch) => {
  dispatch({ type: FETCH_COURSE_REQUEST });

  try {
    const token = localStorage.getItem('sassoontoken');
    if (!token) {
      console.warn("No token found in localStorage");
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/allcourses`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('response course data ',response)

    dispatch({
      type: FETCH_COURSE_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    console.error("Error fetching courses:", error.response || error);
    dispatch({
      type: FETCH_COURSE_FAILURE,
      payload: error.message || "Failed to fetch courses",
    });
  }
};
