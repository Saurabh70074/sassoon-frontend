import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import BookingList from './components/BookingList/BookingList';
import CoursesPlaces from './components/CoursesPlaces/CoursesPlaces';
import LoginPage from './components/Login/LoginPage';
import CourseForm from './components/Courses/CourseForm';
import './App.css';

const App = () => {
  const location = useLocation();

  // Helper function to check authentication
  const isAuthenticated = () => !!localStorage.getItem('sassoontoken');

  // Component to handle route protection
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  };

  // Show Banner only on certain pages
  const showBanner = !['/courses/list', '/courses/places', '/login'].includes(location.pathname);

  // Condition to hide Header/Footer on the login page
  const showHeaderFooter = location.pathname !== '/login';

  return (
    <div className="app">
       <ProtectedRoute>
       {showHeaderFooter && <Header />}
       {showHeaderFooter && showBanner && <Banner />}
       </ProtectedRoute>   

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/list"
          element={
            <ProtectedRoute>
              <BookingList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/places"
          element={
            <ProtectedRoute>
              <CoursesPlaces />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-user"
          element={
            <ProtectedRoute>
              <CourseForm />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
