import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './css/PetDetail.css'; // Import the CSS file

const QuizDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchquiz = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz details', error);
      }
    };
    fetchquiz();
  }, [id]);

  return (
    <div className="pet-page">
      <h1>Selected Quiz Details</h1>
      {quiz ? (
        <div className="pet-detail-container">
          <div className="pet-details">
            <h2><strong>Question :</strong> {quiz.question}</h2>
            <p style={{marginLeft:50}}><strong>Option 1 :</strong> {quiz.option1}</p>
            <p style={{marginLeft:50}}><strong>Option 2 :</strong> {quiz.option2}</p>
            <p style={{marginLeft:50}}><strong>Option 3 :</strong> {quiz.option3}</p>
            <p style={{marginLeft:50}}><strong>Option 4 :</strong> {quiz.option4}</p>
            <p style={{marginLeft:1, marginTop:15, color:'#0000FF'}}><strong>Answer :</strong> {quiz.answer}</p>
            <p>Return to <Link to={`/quizzes`} className="html-link">All Quizzes</Link></p>
          </div>
        </div>
      ) : (
        <p>Loading Quiz details...</p>
      )}
    </div>
  );
};

export default QuizDetails;
