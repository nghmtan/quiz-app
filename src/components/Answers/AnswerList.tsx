import { FC, useState } from 'react';
import Answer from './Answer';
import styles from './AnswerList.module.css';
interface Answer {
  answer_content: string;
  correct: boolean;
}
interface listProps {
  answers: Answer[];
}

const AnswerList: FC<listProps> = (props) => {
  const { answers } = props;

  return (
    <div className={styles.container}>
      {answers.map((answer, i) => {
        return (
          <Answer
            key={i}
            answer_number={i + 1}
            answer_content={answer.answer_content}
            selected={true}
          />
        );
      })}
    </div>
  );
};
export default AnswerList;
