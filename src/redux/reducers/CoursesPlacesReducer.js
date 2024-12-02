const FETCH_COURSE_REQUEST = "FETCH_COURSE_REQUEST";
const FETCH_COURSE_SUCCESS = "FETCH_COURSE_SUCCESS";
const FETCH_COURSE_FAILURE = "FETCH_COURSE_FAILURE";

const initialCourseState = {
  coursesPlaces: [],
  loading: false,
  error: null,
};

const coursesPlacesReducer = (state = initialCourseState, action) => {
  switch (action.type) {
    case FETCH_COURSE_REQUEST:
      return { 
        ...state, 
        loading: true, // Set loading to true while fetching data
        error: null    // Clear any previous errors
      };

    case FETCH_COURSE_SUCCESS:
      return { 
        ...state, 
        coursesPlaces: action.payload, // Update state with fetched courses
        loading: false,           // Stop loading
        error: null               // Clear any errors
      };

    case FETCH_COURSE_FAILURE:
      return { 
        ...state, 
        loading: false,  // Stop loading
        error: action.payload // Store the error message
      };

    default:
      return state; // Return the current state for unhandled action types
  }
};
  
  export default coursesPlacesReducer;
  