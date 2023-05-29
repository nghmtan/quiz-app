import { FC } from 'react';
import styles from './Endgame.module.css';
import Button from '../../components/UI Components/Buttons/Button';

interface UserAnswer {
  questionId: number;
  answer_content: string;
  selected: boolean;
}

interface endProps {
  onReset: () => void;
  result: number;
  onReview: () => void;
  userAnswer: UserAnswer[];
}
const Endgame: FC<endProps> = (props) => {
  const { onReset, result, onReview, userAnswer } = props;
  console.log(userAnswer);
  return (
    <div className={styles.container}>
      <p
        className={styles.score}
        style={{ fontWeight: 'lighter' }}
      >
        Your score is: <span style={{ fontWeight: 'bold' }}>{result}</span>
      </p>
      <div className={styles.actions}>
        <Button
          text="Try again"
          textColor="white"
          backgroundColor=" #6ED5B7
        "
          handleScreen={onReset}
          hoverColor="#2aba82"
          active={true}
          show={true}
        />
        <Button
          text="Review"
          textColor="white"
          backgroundColor=" #EF4444
        "
          show={true}
          handleScreen={onReview}
          hoverColor="#f46f73"
          active={true}
        />
      </div>
    </div>
  );
};

export default Endgame;
