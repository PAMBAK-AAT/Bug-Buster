
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/authPage.jsx' // Importing the AuthPage component
import Register from './components/register.jsx';
import Login from './components/login.jsx';

import { ToastContainer } from 'react-toastify'; // To use toast notifications
import HomePage from './components/homePage.jsx';
import ProblemPage from './components/problemPage.jsx';
import ProblemDetails from './components/problemDetails.jsx'; // Importing the ProblemDetails component
import PrivateRoute from './components/PrivateRoute.jsx'; // Importing the PrivateRoute component
import ProfilePage from './components/profilePage.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/problemList"
          element={
            <PrivateRoute>
              <ProblemPage />
            </PrivateRoute>
          }
        />

        <Route path="/problem/:id"
          element={
            <PrivateRoute>
              <ProblemDetails />
            </PrivateRoute>
          } 
        />

        <Route path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
