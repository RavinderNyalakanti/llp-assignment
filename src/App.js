import React, { useState, useEffect } from 'react';
import './App.css'
import GreenLightRedLight from './components/GreenLightRedLight';

import RegistrationForm from './components/RegistrationForm';
import { Triangle } from 'react-loader-spinner'

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [totalTime, setTotalTime] = useState(40); // Total game time in seconds 
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 5000)
  }, [])


  const handleStartGame = (selectedDifficulty) => {
    setGameStarted(true);
    setDifficulty(selectedDifficulty);
    setTotalTime(40); // Reset total time when starting a new game
  };

  const handleGameEnd = (win, score) => {
    setGameResult(win ? 'You Win!' : 'Game Over!');
    setGameStarted(false);

    if (win) {
      // Add the player's score to the leaderboard
      setLeaderboardData((prevData) => [...prevData, { name: 'Player', score }]);
    }
  };

  const handleRegistration = (name, email, mobile, selectedDifficulty) => {
    setGameStarted(true);
    setDifficulty(selectedDifficulty);
    setTotalTime(40); // Reset total time when starting a new game
  };

  return (
    <div > 
      {
        loader ? ( 
          <div className='app-main-container'> 
             <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true} 
        />
            </div>
         
        ) :  <div className='home-main-card-container'>
        {!gameStarted ? (
          <RegistrationForm onRegistration={handleRegistration} />
        ) : (
          <div>
            <h1 className='game-title-heading'>Green Light Red Light Game</h1>
            <GreenLightRedLight difficulty={difficulty} onGameEnd={handleGameEnd} totalTime={totalTime} />
            {/* <p>{gameResult}</p> */}
          </div>
        )}

        {/* <Leaderboard leaderboardData={leaderboardData} />
      <p>Total Time Remaining: {totalTime} seconds</p> */}
      </div>
      }
     
    </div>

  );
}

export default App;
