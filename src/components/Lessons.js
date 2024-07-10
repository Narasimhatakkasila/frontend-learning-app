import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Pet.css'; // Import the CSS file
import { useParams, Link } from 'react-router-dom';

const Lessons = () => {
  const { type } = useParams(); // Get the type parameter from URL
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchLessons();
  }, [type]);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lessons`);
      setLessons(response.data);
    } catch (error) {
      console.error(`Error fetching Lessons:`, error);
    }
  };

  const handleDelete = async (lessionId) => {
    if (window.confirm(`Are you sure you want to delete this Lesson?`)) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/lessons/${lessionId}`);
        fetchLessons(); // Refresh the Lessons list after delete
      } catch (error) {
        console.error(`Error deleting the Lesson:`, error);
      }
    }
  };

  return (
    <div className="pet-container">
        {lessons.length === 0 ?  "" : (<h2>Lessons Available for Learning</h2>)}
      {lessons.length === 0 ? (
        <p className="no-pets-message">No Lessons available for Learning at the moment. Please check back later!</p>
      ) : (
        <div className="pet-list">
          {lessons.map((lesson) => (
            <div className="pet-card" key={lesson._id}>
              <img src={`data:image/jpeg;base64,${lesson.image}`} alt={lesson.title} className="pet-image" />
              <div className="pet-details">
                <h3><strong>Title: </strong>{lesson.title}</h3>
                <p><strong>Description:</strong> {lesson.description}</p>
                {/* <p><strong>Link:</strong> {lesson.link}</p> */}
                <p><Link to={`/lesson/${lesson._id}`} className="html-link"> View </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/EditLesson/${lesson._id}`} className="html-link"> Edit </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleDelete(lesson._id)} className="adopt-button">Delete</button></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lessons;
