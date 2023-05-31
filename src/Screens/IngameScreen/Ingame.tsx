import { FC, useEffect, useState } from 'react';
import styles from './Ingame.module.css';
import Button from '../../components/UI Components/Buttons/Button';
import Question from '../../components/Question/Question';
import Timer from '../../components/UI Components/Timer/Timer';
import AnswerList from '../../components/Answers/AnswerList';
interface ingameProps {
  data: Question[];
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
interface Question {
  id: string;
  question_content: string;
  answers: Answer[];
}
const Ingame: FC<ingameProps> = (props) => {
  const totalTime = 90;
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const { onEnd, getResult, getUserAnswer, data } = props;
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
