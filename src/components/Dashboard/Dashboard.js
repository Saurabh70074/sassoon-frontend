import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Cards/Card'; // Importing the Card component
import './Dashboard.css';
import BookingListImage from '../../images/Bookinglist.png';
import CoursesImage from '../../images/Courses.png';

const Dashboard = () => {
  const navigate = useNavigate();  // Use navigate hook from react-router-dom
  
  const cards = [
    {
      id: 1,
      title: 'BOOKING LIST',
      image: BookingListImage
    },
    {
      id: 2,
      title: 'COURSES & DATES',
      image: CoursesImage
    },
  ];

  const handleCardClick = (cardTitle) => {
    // Handle navigation based on the card clicked
    if (cardTitle === 'BOOKING LIST') {
      navigate('/courses/list');
    } else if (cardTitle === 'COURSES & DATES') {
      navigate('/courses/places');
    }
  };

  return (
    <div className="dashboard">
      {cards.map((card) => (
        <Card 
          key={card.id}
          title={card.title} 
          image={card.image}
          onClick={() => handleCardClick(card.title)}  // Correctly passing the function
        />
      ))}
    </div>
  );
};

export default Dashboard;
