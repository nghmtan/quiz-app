import { FC } from 'react';
import styles from './Ingame.module.css';
import Button from '../../components/UI Components/Buttons/Button';
import Question from '../../components/Question/Question';
import Timer from '../../components/UI Components/Timer/Timer';
import AnswerList from '../../components/Answers/AnswerList';
const Ingame: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Button
          text="Previous"
          textColor="white"
          backgroundColor=" #6B7280
        "
          hoverColor="#d1d5db"
          active={true}
          className={styles.mr}
        />
        <Button
          text="Next"
          textColor="white"
          backgroundColor=" rgba(110,231,183,1)
        "
          className={styles.ml}
          hoverColor="#5aaf97"
          active={true}
        />
        <Button
          text="Submit"
          textColor="white"
          backgroundColor=" #F59E0B
       "
          className={styles.ml}
          hoverColor="#f8bf37"
          active={true}
        />
      </div>
      <div className={styles.questionContainer}>
        <Timer />
        <Question />
      </div>
      <AnswerList />
    </div>
  );
};
export default Ingame;
