import { FC } from 'react';
import styles from './Question.module.css';
interface questionProps {
  currentQuestion: number;
  questionTitle: string;
}
const Question: FC<questionProps> = (props) => {
  const { currentQuestion, questionTitle } = props;
  return (
    <div>
      <p className={styles.questionNum}>
        Question <span style={{ fontWeight: 'bold' }}>{currentQuestion + 1}</span>/5
      </p>
      <h4>{questionTitle}</h4>
    </div>
  );
};
export default Question;
