import { useState } from 'react';

import './App.css';
import Button from './components/UI Components/Buttons/Button';
import Welcome from './Screens/WelcomeScreen/Welcome';
import Question from './components/Question/Question';
import Ingame from './Screens/IngameScreen/Ingame';
import Endgame from './Screens/EndgameScreen/Endgame';
import Review from './Screens/ReviewScreen/Review';
interface UserAnswer {
  questionId: number;
  answer_content: string;
  selected: boolean;
}

function App() {
  const [screen, setScreen] = useState('welcome');

  const handleStart = () => setScreen('ingame');
  const handleEnd = () => setScreen('end');
  const handleReview = () => setScreen('review');
  const handleReset = () => setScreen('welcome');
  const [result, setResult] = useState(0);
  const getResult = (result: number) => {
    setResult(result);
    return result;
  };

  const [userAnswer, setUserAnswer] = useState<UserAnswer[]>([]);
  const getUserAnswer = (userAnswer: UserAnswer[]) => {
    setUserAnswer(userAnswer);
  };
  switch (screen) {
    case 'welcome':
      return <Welcome onStart={handleStart} />;
    case 'ingame':
      return (
        <Ingame
          onEnd={handleEnd}
          getResult={getResult}
          getUserAnswer={getUserAnswer}
        />
      );
    case 'end':
      return (
        <Endgame
          userAnswer={userAnswer}
          onReview={handleReview}
          result={result}
          onReset={handleReset}
        />
      );
    case 'review':
      return (
        <Review
          onReset={handleReset}
          userAnswer={userAnswer}
        />
      );
    default:
      return null;
  }
}

export default App;
