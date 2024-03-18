import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogOutBtnProps {
  handleLogOut: () => void;
}

const LogOutBtn = ({ handleLogOut }: LogOutBtnProps) => {
  const navigate = useNavigate();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    handleLogOut();
    navigate('/');
  };

  return (
    <button type="button" className="btn" id="logout-btn" onClick={handleClick}>
      Log Out
    </button>
  );
};

export default LogOutBtn;
