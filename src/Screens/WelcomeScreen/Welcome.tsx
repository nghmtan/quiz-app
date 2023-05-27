import { FC } from 'react';
import Button from '../../components/UI Components/Buttons/Button';
const Welcome: FC = () => {
  return (
    <>
      <Button
        text="start"
        backgroundColor="#6ED5B7"
        active={true}
        textColor="black"
      ></Button>
    </>
  );
};
export default Welcome;
