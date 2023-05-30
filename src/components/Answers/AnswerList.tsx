import { FC, useState } from 'react';
import Answer from './Answer';
import styles from './AnswerList.module.css';

interface Answer {
  answer_content: string;
  correct: boolean;
}

interface UserAnswer {
  questionId: number;
  answer_content: string;
  selected: boolean;
}

interface ListProps {
  answerStatus?: boolean;
  answers: Answer[];
  onChangeAnswer: (answer: UserAnswer) => void;
  currentQuestion: number;
  userAnswer: UserAnswer[];
}

const AnswerList: FC<ListProps> = (props) => {
  const { answers, onChangeAnswer, currentQuestion, userAnswer, answerStatus } = props;
  return (
    <div className={styles.container}>
      {answers.map((answer, i) => {
        const userAnswerObj = userAnswer.find((ua) => ua.questionId === currentQuestion);
        let selected = userAnswerObj
          ? userAnswerObj.answer_content === answer.answer_content
          : false;
        let correct = false;
        let wrong = false;
        if (answerStatus === false) {
          selected = false;
          if (answer.correct) {
            correct = true;
          }
          if (userAnswerObj?.answer_content === answer.answer_content && !answer.correct) {
            wrong = true;
          }
        }
        return (
          <Answer
            key={i}
            answer_number={i + 1}
            answer_content={answer.answer_content}
            selected={selected}
            onChangeAnswer={onChangeAnswer}
            currentQuestion={currentQuestion}
            status={answerStatus}
            correct={correct}
            wrong={wrong}
          />
        );
      })}
    </div>
  );
};

export default AnswerList;
