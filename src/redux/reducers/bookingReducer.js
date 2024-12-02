// Define constants for action types
const FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST";
const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";

// Initial state
const initialBookingState = {
  bookings: [],
  loading: false,
  error: null,
};

// Reducer function
const bookingReducer = (state = initialBookingState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_REQUEST:
      return { 
        ...state, 
        loading: true, // Set loading to true while fetching data
        error: null    // Clear any previous errors
      };

    case FETCH_BOOKINGS_SUCCESS:
      return { 
        ...state, 
        bookings: action.payload, // Update state with fetched bookings
        loading: false,           // Stop loading
        error: null               // Clear any errors
      };

    case FETCH_BOOKINGS_FAILURE:
      return { 
        ...state, 
        loading: false,  // Stop loading
        error: action.payload // Store the error message
      };

    default:
      return state; // Return the current state for unhandled action types
  }
};

export default bookingReducer;
