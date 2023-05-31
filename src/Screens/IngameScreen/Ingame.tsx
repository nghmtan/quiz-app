import { FC, useEffect, useState } from 'react';
import styles from './Ingame.module.css';
import Button from '../../components/UI Components/Buttons/Button';
import Question from '../../components/Question/Question';
import Timer from '../../components/UI Components/Timer/Timer';
import AnswerList from '../../components/Answers/AnswerList';
interface ingameProps {
  onEnd: () => void;
  getResult: (result: number) => number;
  getUserAnswer: (userAnswer: userAnswer[]) => void;
}
interface Answer {
  answer_content: string;
  correct: boolean;
}
interface userAnswer {
  questionId: number;
  answer_content: string;
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

  const totalTime = 90;
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const { onEnd, getResult, getUserAnswer } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [userAnswer, setUserAnswer] = useState<userAnswer[]>([]);

  const handleNextQuestion = () => {
    const currentQuestionId = Number(data[currentIndex].id);
    const hasAnswer = userAnswer.some((answer) => answer.questionId === currentQuestionId);
    if (!hasAnswer) {
      setUserAnswer((prevState) => [
        ...prevState,
        {
          questionId: currentQuestionId,
          answer_content: '',
          selected: false,
        },
      ]);
      if (currentQuestionId === 4) {
        setUserAnswer((prevState) => [
          ...prevState,

          {
            questionId: currentQuestionId + 1,
            answer_content: '',
            selected: false,
          },
        ]);
      }
    }

    if (currentIndex < data.length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
    if (currentIndex === data.length - 2) {
      setShowSubmit(true);
    }
  };
  const [checkContinue, setContinue] = useState(false);
  const handleUserAnswer = (answer: userAnswer) => {
    setUserAnswer((prevState) => {
      const existingAnswerIndex = prevState.findIndex(
        (item) => item.questionId === answer.questionId
      );

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswer = { ...prevState[existingAnswerIndex], ...answer };
        return [
          ...prevState.slice(0, existingAnswerIndex),
          updatedAnswer,
          ...prevState.slice(existingAnswerIndex + 1),
        ];
      } else {
        // Add new answer
        return [...prevState, answer];
      }
    });
  };
  const handlePrevQuestion = () => {
    setShowSubmit(false);
    if (currentIndex > 0) setCurrentIndex((prevState) => prevState - 1);
  };
  let stop: number;
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (remainingTime === 0) {
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        for (let k = 0; k < data[i].answers.length; k++) {
          if (
            data[i].answers[k].correct &&
            data[i].answers[k].answer_content === userAnswer[i]?.answer_content
          ) {
            count++;
          }
        }
      }

      getResult(count);
      getUserAnswer(userAnswer);
      setTimeout(() => {
        onEnd();
      }, 1000);
    }
  }, [remainingTime]);

  const onSubmit = () => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].answers.length; k++) {
        if (
          data[i].answers[k].correct &&
          data[i].answers[k].answer_content === userAnswer[i]?.answer_content
        ) {
          count++;
        }
      }
    }

    getResult(count);
    stop = Date.now();
    const text = 'Do you want to submit answers ?';
    if (confirm(text) == true) {
      getUserAnswer(userAnswer);
      onEnd();
    } else {
      stop = Date.now() - stop;
      if (remainingTime - Math.floor(stop / 1000) < 0) {
        setRemainingTime(0);
      } else {
        setRemainingTime((prevState) => prevState - Math.floor(stop / 1000));
      }
    }
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
          show={true}
          active={currentIndex === 0 ? false : true}
        />
        <Button
          text="Next"
          textColor="white"
          backgroundColor=" rgba(110,231,183,1)
        "
          show={true}
          handleScreen={handleNextQuestion}
          hoverColor="#5aaf97"
          active={currentIndex === data.length - 1 ? false : true}
        />
        <Button
          text="Submit"
          textColor="white"
          backgroundColor=" #F59E0B
       "
          handleScreen={onSubmit}
          hoverColor="#f8bf37"
          active={true}
          show={showSubmit}
        />
      </div>
      <div className={styles.questionContainer}>
        <Timer
          time={totalTime}
          remainingTime={remainingTime}
        />
        <Question
          currentQuestion={currentIndex}
          questionTitle={data[currentIndex].question_content}
        />
      </div>
      <AnswerList
        answers={data[currentIndex].answers}
        onChangeAnswer={handleUserAnswer}
        userAnswer={userAnswer}
        answerStatus={true}
        currentQuestion={Number(data[currentIndex].id)}
      />
    </div>
  );
};
export default Ingame;
