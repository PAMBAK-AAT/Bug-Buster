
import './App.css'
import Register from './components/register.jsx'
import Login from './components/login.jsx'

import { ToastContainer } from 'react-toastify'; // To use toast notifications

function App() {
  
  return (
    <>
      <Login />
      <Register />
      <ToastContainer />
    </>
  )
}

export default App
