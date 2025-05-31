
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AuthPage from './components/authPage.jsx';
import HomePage from './components/homePage.jsx';
import ProblemPage from './components/problemPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProfilePage from './components/profilePage.jsx';
import Navbar from './components/Navbar.jsx';
import Review from './components/Review.jsx';
import SolveProblem from './components/solveProblem.jsx';
import IntroPage from './components/introPage.jsx';
import Leaderboard from './components/leaderboard.jsx';

import { ToastContainer } from 'react-toastify';

const AppContent = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/auth' ||
    location.pathname === '/ai-review' ||
    location.pathname === '/intro' ||
    location.pathname.startsWith('/problem/');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? 'pt-20' : ''}>
        <Routes>
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          <Route
            path="/problemList"
            element={
              <PrivateRoute>
                <ProblemPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/problem/:id"
            element={
              <PrivateRoute>
                <SolveProblem />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="/ai-review" element={<Review />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


