// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from './lib/firebase';
// import AuthPage from './components/AuthPage';

// function App() {
//   const [user, loading] = useAuthState(auth);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route 
//           path="/" 
//           element={!user ? <Navigate to="/auth" /> : <Navigate to="https://voice-based-app.vercel.app" />} 
//         />
//         <Route 
//           path="/auth" 
//           element={user ? <Navigate to="/" /> : <AuthPage />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import AuthPage from "./components/AuthPage";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            !user ? <Navigate to="/auth" /> : (() => {
              window.location.href = "https://voice-based-app.vercel.app"; 
              return null; 
            })()
          } 
        />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
