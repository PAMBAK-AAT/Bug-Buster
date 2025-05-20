
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/authPage.jsx' // Importing the AuthPage component

import { ToastContainer } from 'react-toastify'; // To use toast notifications
import HomePage from './components/homePage.jsx';
import ProblemPage from './components/problemPage.jsx';
import ProblemDetails from './components/problemDetails.jsx'; // Importing the ProblemDetails component

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problemList" element={<ProblemPage />} />
        <Route path="/problem/:id" element={<ProblemDetails />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
