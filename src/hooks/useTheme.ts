import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setTheme } from '../store/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  const changeTheme = (theme: 'yellow' | 'white' | 'black') => {
    dispatch(setTheme(theme));
  };

  return {
    currentTheme,
    changeTheme,
  };
}; 