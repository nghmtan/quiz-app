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
  answers: Answer[];
  onChangeAnswer: (answer: UserAnswer) => void;
  currentQuestion: number;
  userAnswer: UserAnswer[];
}

const AnswerList: FC<ListProps> = (props) => {
  const { answers, onChangeAnswer, currentQuestion, userAnswer } = props;
  console.log(userAnswer);
  return (
    <div className={styles.container}>
      {answers.map((answer, i) => {
        const userAnswerObj = userAnswer.find((ua) => ua.questionId === currentQuestion);
        const selected = userAnswerObj
          ? userAnswerObj.answer_content === answer.answer_content
          : false;

        return (
          <Answer
            key={i}
            answer_number={i + 1}
            answer_content={answer.answer_content}
            selected={selected}
            onChangeAnswer={onChangeAnswer}
            currentQuestion={currentQuestion}
          />
        );
      })}
    </div>
  );
};

export default AnswerList;
