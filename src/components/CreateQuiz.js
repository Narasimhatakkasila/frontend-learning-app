import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateLesson = () => {
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer:''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/quizzes/create`, formData);
      console.log("data ",formData);
      alert('Quiz Created Sucessfully! Redirecting to Lesson Details Page');
      navigate('/quiz/'+response.data._id)
    } catch (error) {
      console.error('Error creating Quiz', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError('Server did not respond. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
      <div className="create-pet-page" >
          <div className="login-container" style={{ marginTop: -50 }}>
              <h2>Enter Quiz Details</h2>
              <form onSubmit={handleSubmit}>
                  <div className="login-inputs">
                      <input type="text" name="question" value={formData.question} onChange={handleChange} placeholder="Enter Quesion" required />
                      <input type="text" name="option1" value={formData.option1} onChange={handleChange} placeholder="Enter Option 1" required />
                      <input type="text" name="option2" value={formData.option2} onChange={handleChange} placeholder="Enter Option 2" required />
                      <input type="text" name="option3" value={formData.option3} onChange={handleChange} placeholder="Enter Option 3" required />
                      <input type="text" name="option4" value={formData.option4} onChange={handleChange} placeholder="Enter Option 4" required />
                      <input type="text" name="answer" value={formData.answer} onChange={handleChange} placeholder="Enter Answer" required />
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button type="submit" className="login-button">Create Quiz</button>
              </form>
              {/* <p>Back to <Link to="/login" className="html-link">Login</Link> page</p> */}
          </div>
      </div>
  );
};

export default CreateLesson;
