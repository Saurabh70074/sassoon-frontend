// Define constants for action types
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

// Helper function to get user data from localStorage
const getUserFromLocalStorage = () => {
  const token = localStorage.getItem("sassoontoken");
  if (token) {
    try {
      // Decode the token or parse user data (e.g., if stored as JSON)
      const user = JSON.parse(atob(token.split(".")[1])); // Assuming JWT format
      return user;
    } catch (error) {
      console.error("Failed to parse user data from token:", error);
      return null;
    }
  }
  return null;
};

// Initial state
const initialAuthState = {
  user: getUserFromLocalStorage(), // Retrieve user from localStorage
  loading: false,                 // Indicates whether a login request is in progress
  error: null,                    // Holds any error messages
};

// Reducer function
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true during login request
        error: null,   // Clear any previous errors
      };

    case LOGIN_SUCCESS:
      // Save token to localStorage
      localStorage.setItem("sassoontoken", action.payload.token);
      return {
        ...state,
        user: action.payload.user, // Update state with logged-in user data
        loading: false,            // Stop loading
        error: null,               // Clear any errors
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,       // Stop loading
        error: action.payload, // Store the error message
      };

    case LOGOUT:
      // Clear token and user data from localStorage
      localStorage.removeItem("sassoontoken");
      return {
        ...state,
        user: null,          // Clear user data on logout
        loading: false,      // Ensure loading is false
        error: null,         // Clear any errors
      };

    default:
      return state; // Return the current state for unhandled action types
  }
};

export default authReducer;
