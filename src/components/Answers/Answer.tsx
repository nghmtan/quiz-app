import { FC, useState } from 'react';
import styles from './Answer.module.css';

interface answerProps {
  answer_content: string;
  answer_number: number;
  selected: boolean;
}
const Answer: FC<answerProps> = (props) => {
  const { answer_content, answer_number, selected } = props;

  return (
    <p className={`${styles.container} ${selected ? styles.selected : ''}`}>
      {' '}
      {answer_number}) {answer_content}{' '}
    </p>
  );
};
export default Answer;
