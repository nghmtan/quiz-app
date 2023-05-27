import { useState } from 'react';

import './App.css';
import Button from './components/UI Components/Buttons/Button';
import Welcome from './Screens/WelcomeScreen/Welcome';
import Question from './components/Question/Question';
import Ingame from './Screens/IngameScreen/Ingame';
import Endgame from './Screens/EndgameScreen/Endgame';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const handleNextScreen = () => {
    switch (currentScreen) {
      case 'home':
        setCurrentScreen('question');
        break;
      case 'question':
        setCurrentScreen('review');
        break;
      case 'review':
        setCurrentScreen('result');
        break;
      default:
        break;
    }
  };
  return (
    <div className="app-container">
      <Ingame></Ingame>
    </div>
  );
}

export default App;
