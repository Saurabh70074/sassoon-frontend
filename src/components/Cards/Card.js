import React from 'react';
import './Card.css';

const Card = ({ image, title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>  {/* Add onClick handler here */}
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

export default Card;
