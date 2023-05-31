import { useEffect, useState } from 'react';

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
interface Answer {
  answer_content: string;
  correct: boolean;
}

interface Question {
  id: string;
  question_content: string;
  answers: Answer[];
}
function shuffleArray(array: Question[]) {
  const contentAndAnswers = array.map(({ question_content, answers }) => ({
    question_content,
    answers,
  }));

  for (let i = contentAndAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [contentAndAnswers[i], contentAndAnswers[j]] = [contentAndAnswers[j], contentAndAnswers[i]];
  }

  const result = contentAndAnswers.map(({ question_content, answers }, index) => ({
    id: String(index + 1),
    question_content,
    answers,
  }));

  return result;
}

function App() {
  const data = [
    {
      id: '1',
      question_content: 'React is mainly used for building ___.',
      answers: [
        {
          answer_content: 'Database',
          correct: false,
        },
        {
          answer_content: 'User interface',
          correct: true,
        },
        {
          answer_content: 'Design Platform',
          correct: false,
        },
      ],
    },
    {
      id: '2',
      question_content: 'The lifecycle methods are mainly used for ___.',
      answers: [
        {
          answer_content: 'keeping track of event history',
          correct: false,
        },
        {
          answer_content: 'enhancing components',
          correct: false,
        },
        {
          answer_content: 'freeing up resources',
          correct: false,
        },
        {
          answer_content: 'none of the above',
          correct: true,
        },
      ],
    },
    {
      id: '3',
      question_content:
        '___ can be done while multiple elements need to be returned from a component.',
      answers: [
        {
          answer_content: 'Abstraction',
          correct: false,
        },
        {
          answer_content: 'Insulation',
          correct: false,
        },
        {
          answer_content: 'Wrapping',
          correct: true,
        },
      ],
    },
    {
      id: '4',
      question_content:
        'Which is the right way of accessing a function fetch() from an h1 element in JSX?',
      answers: [
        {
          answer_content: '<h1>{fetch()}</h1>',
          correct: true,
        },
        {
          answer_content: '<h1>${fetch()}</h1>',
          correct: false,
        },
        {
          answer_content: '<h1>{fetch}</h1>',
          correct: false,
        },
        {
          answer_content: '<h1>${fetch}</h1>',
          correct: false,
        },
      ],
    },
    {
      id: '5',
      question_content:
        'Which of the following methods in a React Component should be overridden to stop the component from updating?',
      answers: [
        {
          answer_content: 'willComponentUpdate',
          correct: false,
        },
        {
          answer_content: 'shouldComponentUpdate',
          correct: true,
        },
      ],
    },
  ];

  const [data1, setShuffledData] = useState<Question[]>([]);

  useEffect(() => {
    const shuffled = shuffleArray(data);
    setShuffledData(shuffled);
  }, []);

  const [screen, setScreen] = useState('welcome');

  const handleStart = () => setScreen('ingame');
  const handleEnd = () => setScreen('end');
  const handleReview = () => setScreen('review');
  const handleReset = () => {
    window.location.reload();
  };

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
          data={data1}
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
          data={data1}
          onReset={handleReset}
          userAnswer={userAnswer}
        />
      );
    default:
      return null;
  }
}

export default App;
