import './App.css';
import React from 'react';
import {Navigate, Routes, Route} from 'react-router-dom';
import StudentRouter from './components/Student/StudentRouter';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Navigate to="/login" replace={true}/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
      <StudentRouter/>
    </div>
  );
}

export default App;
