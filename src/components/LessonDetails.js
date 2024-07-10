import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './css/PetDetail.css'; // Import the CSS file

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lessons/${id}`);
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching lesson details', error);
      }
    };
    fetchLesson();
  }, [id]);

  return (
    <div className="pet-page">
      <h1>Selected Lesson Details</h1>
      {lesson ? (
        <div className="pet-detail-container">
          <img src={`data:image/jpeg;base64,${lesson.image}`} alt={lesson.title} className="pet-image" />
          <div className="pet-details">
            <h2><strong>Lesson Title :</strong> {lesson.title}</h2>
            <p><strong>Description:</strong> {lesson.description}</p>
            <p><strong>Link:</strong> {lesson.link}</p>
            <p>Return to <Link to={`/lessons`} className="html-link">All Lessons</Link></p>
          </div>
        </div>
      ) : (
        <p>Loading lesson details...</p>
      )}
    </div>
  );
};

export default LessonDetails;
