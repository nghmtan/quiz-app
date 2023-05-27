import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Buttons.module.css';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  textColor: string;
  backgroundColor: string;
  active: boolean;
}
const Button: FC<ButtonProps> = (props) => {
  const { text, textColor, backgroundColor, active } = props;

  return (
    <button
      className={styles.btnstyle}
      style={{ color: textColor, backgroundColor }}
    >
      {text}
      {active && <span> - Active</span>}
    </button>
  );
};
export default Button;
