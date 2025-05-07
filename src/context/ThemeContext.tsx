import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type ThemeColors = {
  background: string;
  text: string;
  card: string;
  cardText: string;
  button: {
    primary: string;
    secondary: string;
  };
};

const themeColors: Record<string, ThemeColors> = {
  yellow: {
    background: 'bg-yellow-50',
    text: 'text-gray-900',
    card: 'bg-yellow-100',
    cardText: 'text-gray-900',
    button: {
      primary: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      secondary: 'bg-yellow-200 hover:bg-yellow-300 text-gray-900',
    },
  },
  white: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    card: 'bg-white',
    cardText: 'text-gray-900',
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    },
  },
  black: {
    background: 'bg-gray-900',
    text: 'text-white',
    card: 'bg-gray-800',
    cardText: 'text-gray-100',
    button: {
      primary: 'bg-gray-700 hover:bg-gray-600 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-500 text-white',
    },
  },
};

const ThemeContext = createContext<ThemeColors | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const colors = themeColors[currentTheme];

  return (
    <ThemeContext.Provider value={colors}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColors = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeColors must be used within a ThemeProvider');
  }
  return context;
}; 