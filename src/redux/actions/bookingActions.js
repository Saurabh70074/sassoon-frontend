import axios from "axios";

// Define action types
export const FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";

// Action to fetch bookings from the API
export const fetchBookings = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKINGS_REQUEST }); // Set loading state

  try {
    // Make the API call
    const token = localStorage.getItem('sassoontoken'); // Retrieve token from localStorage

  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/bookings`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

    dispatch({
      type: FETCH_BOOKINGS_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    // Dispatch failure action with error message
    dispatch({
      type: FETCH_BOOKINGS_FAILURE,
      payload: error.message || "Failed to fetch bookings",
    });
  }
};
