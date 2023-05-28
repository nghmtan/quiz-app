import { FC, useState } from 'react';
import Button from '../../components/UI Components/Buttons/Button';
import styles from './Welcome.module.css';
interface WelcomeProps {
  onStart: () => void;
}

const Welcome: FC<WelcomeProps> = (props: WelcomeProps) => {
  const { onStart } = props;
  console.log(onStart);
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Welcome to React Quiz Game!</h1>
      <Button
        text="Start"
        backgroundColor="rgba(110,231,183,1)"
        active={true}
        hoverColor="#5aaf97"
        textColor="black"
        handleScreen={onStart}
      />
    </div>
  );
};

export default Welcome;
