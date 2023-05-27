import { FC } from 'react';
import styles from './Endgame.module.css';
import Button from '../../components/UI Components/Buttons/Button';
const Endgame: FC = () => {
  return (
    <div className={styles.container}>
      <p
        className={styles.score}
        style={{ fontWeight: 'lighter' }}
      >
        Your score is: <span style={{ fontWeight: 'bold' }}>3</span>
      </p>
      <div className={styles.actions}>
        <Button
          text="Try again"
          textColor="white"
          backgroundColor=" #6ED5B7
        "
          hoverColor="#2aba82"
          active={true}
        />
        <Button
          text="Review"
          textColor="white"
          backgroundColor=" #EF4444
        "
          hoverColor="#f46f73"
          active={true}
        />
      </div>
    </div>
  );
};

export default Endgame;
