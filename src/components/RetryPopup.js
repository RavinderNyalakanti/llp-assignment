import React from 'react';
import '../App.css' 
import Button from '@mui/material/Button';
function RetryPopup({ onRetry }) {
  return (
    <div className="retry-popup">
      <p style={{color:'#010e21'}}>Game Over!!</p>
      
      <Button style={{backgroundColor:'#e87109',color:'#fff'}} onClick={onRetry}>Try Again</Button>
    </div>
  );
}

export default RetryPopup;
