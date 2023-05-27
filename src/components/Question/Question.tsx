import { FC } from 'react';
import styles from './Question.module.css';
const Question: FC = () => {
  return (
    <div>
      <p className={styles.questionNum}>
        Question <span style={{ fontWeight: 'bold' }}>1</span>/5
      </p>
      <h4>
        Which of the following methods in a React Component should be overridden to stop the
        component from updating?
      </h4>
    </div>
  );
};
export default Question;
