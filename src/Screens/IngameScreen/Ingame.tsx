import { FC, useEffect, useState } from 'react';
import styles from './Ingame.module.css';
import Button from '../../components/UI Components/Buttons/Button';
import Question from '../../components/Question/Question';
import Timer from '../../components/UI Components/Timer/Timer';
import AnswerList from '../../components/Answers/AnswerList';
interface ingameProps {
  onEnd: () => void;
}
interface Answer {
  answer_content: string;
  correct: boolean;
}
interface userAnswer {
  questionId: number;
  userAnswer: Answer;
  selected: boolean;
}

const Ingame: FC<ingameProps> = (props) => {
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

  const { onEnd } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentIndex < data.length - 1) setCurrentIndex((prevState) => prevState + 1);
  };
  const handlePrevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex((prevState) => prevState - 1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Button
          handleScreen={handlePrevQuestion}
          text="Previous"
          textColor="white"
          backgroundColor=" #6B7280
        "
          hoverColor="#d1d5db"
          active={currentIndex === 0 ? false : true}
        />
        <Button
          text="Next"
          textColor="white"
          backgroundColor=" rgba(110,231,183,1)
        "
          handleScreen={handleNextQuestion}
          hoverColor="#5aaf97"
          active={currentIndex === data.length - 1 ? false : true}
        />
        <Button
          text="Submit"
          textColor="white"
          backgroundColor=" #F59E0B
       "
          handleScreen={onEnd}
          hoverColor="#f8bf37"
          active={true}
        />
      </div>
      <div className={styles.questionContainer}>
        <Timer />
        <Question
          currentQuestion={currentIndex}
          questionTitle={data[currentIndex].question_content}
        />
      </div>
      <AnswerList answers={data[currentIndex].answers} />
    </div>
  );
};
export default Ingame;
