import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new 'createRoot' from React 18
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import your Redux store
import App from './App'; // Import your App component

// Create root and render the app using the new API in React 18
const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(
  <Provider store={store}> {/* Wrap your app in the Provider to pass the Redux store */}
    <BrowserRouter> {/* Wrap BrowserRouter around the App */}
      <App />
    </BrowserRouter>
  </Provider>
);
