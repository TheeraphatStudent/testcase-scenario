import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeType = 'yellow' | 'white' | 'black';

interface ThemeState {
  currentTheme: ThemeType;
}

const initialState: ThemeState = {
  currentTheme: 'white',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer; 