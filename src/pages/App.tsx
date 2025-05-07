import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Home';
import LoginPage from './Login';
import { getSessionItem } from '../utils/useSession';

const App = () => {
  const isAuthenticated = () => {
    const response = getSessionItem({ name: 'credential' });
    return Boolean(response.data);
  };

  const ProtectedRoute = ({ children }: { children: any }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" /> : <LoginPage />}
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
          element={isAuthenticated() ? <Navigate to="/" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;