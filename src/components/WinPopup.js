import React from 'react'; 
import Button from '@mui/material/Button'; 
import '../App.css'

function WinPopup({ onClose }) {
  return (
    <div className="win-popup">
      <h2>Congratulations, You Won!</h2>
      <Button onClick={onClose} style={{backgroundColor:'#f56122',color:'#fff',fontFamily:'Copperplate, Papyrus, fantasy'}}>Play Again</Button>
    </div>
  );
}

export default WinPopup;
