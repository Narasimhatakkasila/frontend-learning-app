import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateLesson = () => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    description: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.error(e.target.value);
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('link', formData.link);
    data.append('description', formData.description);
    data.append('image', formData.image);
console.error(data);
console.error(data.title);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/lessons/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("data ",data);
      alert('Lesson Created Sucessfully! Redirecting to Lesson Details Page');
      navigate('/lesson/'+response.data._id)
    } catch (error) {
      console.error('Error creating Lesson', error);
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
          <div className="login-container" style={{ marginTop: -100 }}>
              <h2>Enter Lesson Details</h2>
              <form onSubmit={handleSubmit}>
                  <div className="login-inputs">
                      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter Title" required />
                      <input type="text" name="link" value={formData.text} onChange={handleChange} placeholder="Enter Youtube Link" required />
                      <textarea name="description" value={formData.description} onChange={handleChange} placeholder=" Enter Description" required ></textarea>
                      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button type="submit" className="login-button">Create Lesson</button>
              </form>
              {/* <p>Back to <Link to="/login" className="html-link">Login</Link> page</p> */}
          </div>
      </div>
  );
};

export default CreateLesson;
