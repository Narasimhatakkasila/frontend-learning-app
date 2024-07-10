import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './css/EditPet.css'; // Import the CSS file

const EditLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    title: '',
    link: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchLessonDetails();
  }, []);

  const fetchLessonDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lessons/${id}`);
      console.error(response.data);
      setLesson(response.data);
    } catch (error) {
      console.error('Error fetching lesson details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson({
      ...lesson,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.error(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLesson({
        ...lesson,
        image: reader.result.split(',')[1] // Get base64 string
      });
      console.log(lesson.image);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/lessons/${id}`, lesson);
      navigate(`/lesson/${id}`);
    } catch (error) {
      console.error('Error updating lesson details:', error);
    }
  };

  return (
    <div className="edit-pet-container">
      <h2>Edit Lesson Details</h2>
      {lesson.image && <img src={`data:image/jpeg;base64,${lesson.image}`} alt={lesson.title} className="preview-image" />}
      <form onSubmit={handleSubmit} className="edit-pet-form">
      <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
          
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={lesson.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={lesson.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="link">Link:</label>
          <input type="text" id="link" name="link" value={lesson.link} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
      <p>Return to <Link to={`/lessons`} className="html-link">All Lessons</Link></p>  
    </div>
  );
};

export default EditLesson;
