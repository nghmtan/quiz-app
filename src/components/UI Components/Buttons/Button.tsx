import { ButtonHTMLAttributes, FC, useEffect, useState } from 'react';
import styles from './Buttons.module.css';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  textColor: string;
  backgroundColor: string;
  hoverColor: string;
  active: boolean;
  handleScreen: () => void;
  show: boolean;
}
const Button: FC<ButtonProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { text, textColor, backgroundColor, active, hoverColor, handleScreen, show } = props;
  const buttonStyle = {
    color: textColor,
    backgroundColor: isHovered ? hoverColor : backgroundColor,
  };
  useEffect(() => {
    if (active) {
      setIsHovered(false);
    }
  }, [active]);
  return (
    <button
      className={styles.btnstyle}
      disabled={!active}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleScreen}
      hidden={!show}
    >
      {text}
    </button>
  );
};
export default Button;
