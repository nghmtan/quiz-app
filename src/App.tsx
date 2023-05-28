import { useState } from 'react';

import './App.css';
import Button from './components/UI Components/Buttons/Button';
import Welcome from './Screens/WelcomeScreen/Welcome';
import Question from './components/Question/Question';
import Ingame from './Screens/IngameScreen/Ingame';
import Endgame from './Screens/EndgameScreen/Endgame';

function App() {
  const [screen, setScreen] = useState('welcome');

  const handleStart = () => setScreen('ingame');
  const handleEnd = () => setScreen('end');
  const handleReview = () => setScreen('review');
  const handleReset = () => setScreen('welcome');

  switch (screen) {
    case 'welcome':
      return <Welcome onStart={handleStart} />;
    case 'ingame':
      return <Ingame onEnd={handleEnd} />;
    case 'end':
      return (
        <Endgame
          // onReview={handleReview}
          onReset={handleReset}
        />
      );
    // case 'review':
    //   return <Review onReset={handleReset} />;
    default:
      return null;
  }
}

export default App;
