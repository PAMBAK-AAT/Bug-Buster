
import './App.css'
import AuthPage from './components/authPage.jsx' // Importing the AuthPage component

import { ToastContainer } from 'react-toastify'; // To use toast notifications

function App() {
  
  return (
    <>
      <AuthPage />
      <ToastContainer />
    </>
  )
}

export default App
