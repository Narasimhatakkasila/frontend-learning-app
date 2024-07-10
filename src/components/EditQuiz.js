import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './css/EditPet.css'; // Import the CSS file

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: ''
  });

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const fetchQuizDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/quizzes/${id}`);
      console.error(response.data);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({
      ...quiz,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/quizzes/${id}`, quiz);
      navigate(`/quiz/${id}`);
    } catch (error) {
      console.error('Error updating quiz details:', error);
    }
  };

  return (
    <div className="edit-pet-container">
      <h2>Edit Quiz Details</h2>
      <form onSubmit={handleSubmit} className="edit-pet-form">
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input type="text" id="question" name="question" value={quiz.question} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="option1">Option 1:</label>
          <input type="text" id="option1" name="option1" value={quiz.option1} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="option2">Option 2:</label>
          <input type="text" id="option2" name="option2" value={quiz.option2} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="option3">Option 3:</label>
          <input type="text" id="option3" name="option3" value={quiz.option3} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="option4">Option 4:</label>
          <input type="text" id="option4" name="option4" value={quiz.option4} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <input type="text" id="answer" name="answer" value={quiz.answer} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
      <p>Return to <Link to={`/Quizzes`} className="html-link">All Quizzes</Link></p>  
    </div>
  );
};

export default EditQuiz;
