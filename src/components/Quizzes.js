import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Pet.css'; // Import the CSS file
import { useParams, Link } from 'react-router-dom';

const Quizzes = () => {
  const { type } = useParams(); // Get the type parameter from URL
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, [type]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/quizzes`);
      setQuizzes(response.data);
    } catch (error) {
      console.error(`Error fetching Quizzes:`, error);
    }
  };

  const handleDelete = async (quizId) => {
    if (window.confirm(`Are you sure you want to delete this Quiz?`)) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/quizzes/${quizId}`);
        fetchQuizzes(); // Refresh the Lessons list after delete
      } catch (error) {
        console.error(`Error deleting the Quiz:`, error);
      }
    }
  };

  return (
    <div className="pet-container">
        {quizzes.length === 0 ?  "" : (<h2>Quizzes for Learning</h2>)}
      {quizzes.length === 0 ? (
        <p className="no-pets-message">No Quizzes available for Learning at the moment. Please check back later!</p>
      ) : (
        <div className="pet-list">
          {quizzes.map((quiz) => (
            <div className="pet-card" key={quiz._id}>
              <div className="pet-details">
                <h3><strong>Question:   </strong>{quiz.question}</h3>
                <p style={{marginLeft:50}}><strong>Option 1: </strong> {quiz.option1} 
                <strong style={{marginLeft:50}}>Option 2: </strong> {quiz.option2}</p>
                <p style={{marginLeft:50}}><strong>Option 3: </strong> {quiz.option3}
                <strong style={{marginLeft:50}}>Option 4: </strong> {quiz.option4}</p>
                <p><Link to={`/quiz/${quiz._id}`} className="html-link"> View </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/EditQuiz/${quiz._id}`} className="html-link"> Edit </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleDelete(quiz._id)} className="adopt-button">Delete</button></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
