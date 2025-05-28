


import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './components/authPage.jsx';
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import HomePage from './components/homePage.jsx';
import ProblemPage from './components/problemPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProfilePage from './components/profilePage.jsx';
import Navbar from './components/Navbar.jsx';
import Review from './components/Review.jsx';

import SolveProblem from './components/solveProblem.jsx';


import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* padding to prevent overlap with fixed navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          
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

          <Route 
            path="/ai-review"
            element={ <Review />}
          />

        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
