import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Home';
import LoginPage from './Login';
import { getSessionItem } from '../utils/useSession';
import { useState, useEffect } from 'react';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await getSessionItem({ name: 'credential' });
      setIsAuth(Boolean(response.data));
    };

    checkAuth();
  }, []);

  const ProtectedRoute = ({ children }: { children: any }) => {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <LoginPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={isAuth ? <Navigate to="/" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;