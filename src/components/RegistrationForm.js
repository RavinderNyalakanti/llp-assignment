import React, { useState } from 'react'; 
import '../App.css'
// import './App.css'; // Import App.css here 

import Button from '@mui/material/Button';
function RegistrationForm({ onRegistration }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  const handleRegistrationSubmit = () => {
    if (name && email && mobile) {
      onRegistration(name, email, mobile, selectedDifficulty);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className='register-main-card-component'>
    <h1 className='register-welcome-heading' >Welcome to <span style={{color:'#2405b0'}}>GreenLight RedLight</span>  Game</h1>
    <div className="form-group">
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="form-group">
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="form-group">
      <label className='lable-mobile'>Mobile Number:</label>
      <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
    </div>
    <div className="form-group">
      <label>Difficulty Level:</label>
      <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
     
    <Button style={{backgroundColor:'#f56214',fontFamily:'Copperplate, Papyrus, fantasy'}} onClick={handleRegistrationSubmit} variant="contained">Start Game</Button>
  </div>
  
  );
}

export default RegistrationForm;
