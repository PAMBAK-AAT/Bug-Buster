


// import './App.css';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// import AuthPage from './components/auth/AuthPage.jsx';
// import HomePage from './components/homePage.jsx';
// import ProblemPage from './components/problem/ProblemPage.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';
// import ProfilePage from './components/profile/ProfilePage.jsx';
// import Navbar from './components/common/Navbar.jsx';
// import Review from './components/review/Review.jsx';
// import SolveProblem from './components/problem/SolveProblem.jsx';
// import IntroPage from './components/home/IntroPage.jsx';
// import Leaderboard from './components/home/Leaderboard.jsx';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AppContent = () => {
//   const location = useLocation();

//   // Conditionally hide navbar on specific routes
//   const hideNavbar =
//     location.pathname === '/auth' ||
//     location.pathname === '/ai-review' ||
//     location.pathname === '/intro' ||
//     location.pathname.startsWith('/problem/');

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <div className={!hideNavbar ? 'pt-20' : ''}>
//         <Routes>
//           <Route path="/intro" element={<IntroPage />} />
//           <Route path="/" element={<HomePage />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/leaderboard" element={<Leaderboard />} />

//           <Route
//             path="/problemList"
//             element={
//               <PrivateRoute>
//                 <ProblemPage />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/problem/:id"
//             element={
//               <PrivateRoute>
//                 <SolveProblem />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <PrivateRoute>
//                 <ProfilePage />
//               </PrivateRoute>
//             }
//           />

//           <Route path="/ai-review" element={<Review />} />
//         </Routes>

//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     </>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AuthPage from './components/auth/AuthPage.jsx';
import HomePage from './components/home/HomePage.jsx';
import ProblemPage from './components/problem/ProblemPage.jsx';
import SolveProblem from './components/problem/SolveProblem.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';
import Review from './components/review/Review.jsx';
import IntroPage from './components/home/IntroPage.jsx';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';

import Navbar from './components/common/Navbar.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        <ToastContainer position="top-right" autoClose={3000} />
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
