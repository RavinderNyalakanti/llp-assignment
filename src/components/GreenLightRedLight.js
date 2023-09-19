import React, { useState, useEffect } from 'react'; 
import '../App.css'
import RetryPopup from './RetryPopup'; // Import the RetryPopup component
import WinPopup from './WinPopup'; // Import the WinPopup component 
import { CiTimer } from 'react-icons/ci'

function GreenLightRedLight({ difficulty, onGameEnd, totalTime }) {
  const [boxColor, setBoxColor] = useState('red');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(totalTime);
  const [gameOver, setGameOver] = useState(false);
  const [showRetryPopup, setShowRetryPopup] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [hasShownWinPopup, setHasShownWinPopup] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [winningTime, setWinningTime] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        const newColor = boxColor === 'red' ? 'green' : 'red';
        setBoxColor(newColor);
      }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
    }

    return () => clearInterval(interval);
  }, [boxColor, gameOver]);

  useEffect(() => {
    if (timer === 0 || score === difficulty) {
      setGameOver(true);
      onGameEnd(score === difficulty, score, isWinner, winningTime);
    }
  }, [timer, score, difficulty, onGameEnd, isWinner, winningTime]);

  useEffect(() => {
    let countdownInterval;
    if (!gameOver && timer > 0 && !isGameWon) {
      countdownInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (gameOver || timer === 0 || isGameWon) {
      clearInterval(countdownInterval);
    }

    return () => clearInterval(countdownInterval);
  }, [gameOver, timer, isGameWon]);

  const handleBoxClick = () => {
    if (boxColor === 'green' && !gameOver) {
      setScore((prevScore) => prevScore + 1);
    } else if (boxColor === 'red' && !gameOver) {
      setGameOver(true);
      setShowRetryPopup(true);
    }

    if (
      !hasShownWinPopup &&
      ((difficulty === 'easy' && score === 9) ||
        (difficulty === 'medium' && score === 14) ||
        (difficulty === 'hard' && score === 24))
    ) {
      const elapsedTime = totalTime - timer;
      setWinningTime(elapsedTime);
      setIsGameWon(true);
      setIsWinner(true);
      setShowWinPopup(true);
      setHasShownWinPopup(true);
    }
  };

  const handleRetry = () => {
    setBoxColor('red');
    setScore(0);
    setTimer(totalTime); // Reset the timer to its initial value
    setGameOver(false);
    setShowRetryPopup(false);
    setHasShownWinPopup(false);
    setIsWinner(false); // Reset the winner flag
    setIsGameWon(false); // Reset the game won flag
  };
  

  const handleCloseWinPopup = () => {
    setShowWinPopup(false);
    handleRetry(); // Restart the game when the close button is clicked in WinPopup
  };

  return (
    <div className='green-and-red-light-component'>
      <div>
        <div
          onClick={handleBoxClick}
          style={{ backgroundColor: boxColor, width: '100px', height: '100px',borderRadius:'100px',marginLeft:'60px' }}
        ></div> 
        <div style={{display:'flex',padding:'0',marginRight:'50px'}}>
        <p style={{marginRight:'20px',fontSize:'24px',fontWeight:'700'}}>Score: <span style={{color:'#13069e'}}>{score}</span></p>
        <p style={{fontSize:'24px',color:"#000",fontWeight:'700'}}><CiTimer/>Timer: <span style={{color:'#13069e'}}>{timer}</span></p>
        </div>
        
      </div>

      {showRetryPopup && <RetryPopup onRetry={handleRetry} />}
      {showWinPopup && (
        <WinPopup onClose={handleCloseWinPopup} key="win-popup" />
      )}
    </div>
  );
}

export default GreenLightRedLight;
