import { FC } from 'react';
import styles from './Timer.module.css';
interface timerProps {
  status?: string;
  time?: number;
  minutes?: number;
  seconds?: number;
}
const Timer: FC<timerProps> = (props) => {
  const { status, time, seconds, minutes } = props;
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
            fill="white"
          />
          Sorry, your browser does not support inline SVG.
        </svg>
        <p>
          {status ? 'End!' : ''}
          {minutes && seconds ? `0${minutes}:${seconds}` : ''}
        </p>
      </div>
    </div>
  );
};
export default Timer;
