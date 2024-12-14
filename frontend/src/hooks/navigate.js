import { useNavigate } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goTo = (url) => {
    navigate(url);
  };

  return { goTo };
};

export default useCustomNavigate;