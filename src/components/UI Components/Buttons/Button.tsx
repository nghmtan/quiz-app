import { ButtonHTMLAttributes, FC, useState } from 'react';
import styles from './Buttons.module.css';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  textColor: string;
  backgroundColor: string;
  hoverColor: string;
  active: boolean;
}
const Button: FC<ButtonProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const { text, textColor, backgroundColor, active, hoverColor } = props;
  const buttonStyle = {
    color: textColor,
    backgroundColor: isHovered ? hoverColor : backgroundColor,
  };

  return (
    <button
      className={styles.btnstyle}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
      {active && <span></span>}
    </button>
  );
};
export default Button;
