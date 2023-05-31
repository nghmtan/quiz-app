import { FC, useState } from 'react';
import styles from './Review.module.css';
import Button from '../../components/UI Components/Buttons/Button';
import Timer from '../../components/UI Components/Timer/Timer';
import Question from '../../components/Question/Question';
import AnswerList from '../../components/Answers/AnswerList';
interface Answer {
  answer_content: string;
  correct: boolean;
}
interface UserAnswer {
  questionId: number;
  answer_content: string;
  selected: boolean;
}
interface Question {
  id: string;
  question_content: string;
  answers: Answer[];
}
interface reviewProps {
  onReset: () => void;
  userAnswer: UserAnswer[];
  data: Question[];
}
const Review: FC<reviewProps> = (props) => {
  const answerStatus = false;
  const { onReset, userAnswer, data } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNextQuestion = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  const voidFunction = () => {
    console.log('void');
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
          text="Restart"
          textColor="white"
          backgroundColor=" #F59E0B
     "
          handleScreen={onReset}
          hoverColor="#f8bf37"
          active={true}
          show={true}
        />
      </div>
      <div className={styles.questionContainer}>
        <Timer status="End!" />
        <Question
          currentQuestion={currentIndex}
          questionTitle={data[currentIndex].question_content}
        />
      </div>
      <AnswerList
        answers={data[currentIndex].answers}
        userAnswer={userAnswer}
        currentQuestion={Number(data[currentIndex].id)}
        onChangeAnswer={voidFunction}
        answerStatus={answerStatus}
      />
    </div>
  );
};
export default Review;
