import { FC, useState } from 'react';
import styles from './Answer.module.css';
interface userAnswer {
  questionId: number;
  answer_content: string;
  selected: boolean;
}
interface answerProps {
  answer_content: string;
  answer_number: number;
  selected: boolean;
  onChangeAnswer: (answer: userAnswer) => void;
  currentQuestion: number;
  status?: boolean;
  correct?: boolean;
  wrong?: boolean;
}
const Answer: FC<answerProps> = (props) => {
  const {
    answer_content,
    answer_number,
    selected,
    onChangeAnswer,
    currentQuestion,
    status,
    correct,
    wrong,
  } = props;
  const handleUserChange = () => {
    onChangeAnswer({
      answer_content: answer_content,
      questionId: currentQuestion,
      selected: false,
    });
  };
  return (
    <p
      className={`${styles.container} ${selected ? styles.selected : ''} ${
        status ? styles.hoverable : ''
      } ${correct ? styles.correct : ''} ${wrong ? styles.wrong : ''}`}
      onClick={handleUserChange}
    >
      {' '}
      {answer_number}) {answer_content}{' '}
    </p>
  );
};
export default Answer;
