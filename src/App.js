import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import LessonDetail from './components/LessonDetails';
import QuizDetails from './components/QuizDetails';
import Lessons from './components/Lessons';
import Quizzes from './components/Quizzes';
import CreateLesson from './components/CreateLesson';
import CreateQuiz from './components/CreateQuiz';
import EditLesson from './components/EditLesson';
import EditQuiz from './components/EditQuiz';
import { UserContext } from './contexts/UserContext';
import './App.css';

const App = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Router>
      <div className="wrapper">
        <h1 className="App-header">Welcome to the Language Learning App
          {isAuthenticated && user && <div style={{textAlign:'right',fontSize:20, marginLeft:'auto', marginRight:0, paddingRight:10}}>Welcome {user.name}<Link to="/logout" className='logout-link'>Logout</Link></div>}</h1>
          {isAuthenticated && user && (
          <nav className="nav-bar">
            <ul>
              <li><Link to="/Lessons">Lessons</Link></li>
              <li><Link to="/Quizzes">Quizzes</Link></li>
              <li><Link to="/CreateLesson">Add a Lesson</Link></li>
              <li><Link to="/CreateQuiz">Add a Quiz</Link></li>
            </ul>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/CreateLesson" element={<CreateLesson />} />          
          <Route path="/EditLesson/:id" element={<EditLesson />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<QuizDetails />} />
          <Route path="/CreateQuiz" element={<CreateQuiz />} />          
          <Route path="/EditQuiz/:id" element={<EditQuiz />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
