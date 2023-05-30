import { FC } from 'react';
import styles from './Timer.module.css';
interface timerProps {
  status?: string;
  time?: number;
  remainingTime?: number;
}
const Timer: FC<timerProps> = (props) => {
  const { time = 0, remainingTime = 0, status } = props;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const calculateStrokeDashoffset = () => {
    const circumference = 2 * Math.PI * 40;
    return circumference - (remainingTime / time) * circumference;
  };
  const color = remainingTime < 10 ? 'red' : '#312E81';
  return (
    <div className={styles.container}>
      <div>
        <svg
          height="100"
          width="100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#312E81"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={calculateStrokeDashoffset()}
            fill="white"
          />
        </svg>
        <p>
          {status ? (
            'End!'
          ) : (
            <div style={{ color }}>
              {minutes > 10 ? minutes : `0${minutes}`}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          )}
        </p>
      </div>
    </div>
  );
};
export default Timer;
