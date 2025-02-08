// import React, { useState } from 'react';
// import { auth } from '../lib/firebase';
// import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
// import { Chrome, Mic } from 'lucide-react';

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGoogleSignIn = async () => {
//     try {
//       setIsLoading(true);
//       setError('');
//       const provider = new GoogleAuthProvider();
//       provider.setCustomParameters({
//         prompt: 'select_account'
//       });
      
//       try {
//         await signInWithPopup(auth, provider);
//       } catch (popupError: any) {
//         if (popupError.code === 'auth/popup-blocked') {
//           setError('Popup was blocked. Redirecting to Google sign-in...');
//           await signInWithRedirect(auth, provider);
//         } else {
//           throw popupError;
//         }
//       }
//     } catch (error: any) {
//       console.error('Google sign in error:', error);
//       setError(error.message || 'Failed to sign in with Google');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEmailAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
    
//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         await createUserWithEmailAndPassword(auth, email, password);
//       }
//     } catch (error: any) {
//       console.error('Email auth error:', error);
//       setError(error.message || (isLogin ? 'Failed to log in' : 'Failed to create account'));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//         <div className="flex items-center justify-center mb-8 text-indigo-600">
//           <Mic className="w-10 h-10" />
//         </div>
//         <h2 className="text-3xl font-bold text-center mb-2">
//           Voice-Based App
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           {isLogin ? 'Sign in to continue to your voice assistant' : 'Create an account to get started'}
//         </p>
        
//         <form onSubmit={handleEmailAuth} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
//               required
//               disabled={isLoading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
//           )}
          
//           <button
//             type="submit"
//             className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
//           </button>
//         </form>

//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           <button
//             onClick={handleGoogleSignIn}
//             className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             disabled={isLoading}
//           >
//             <Chrome className="w-5 h-5 mr-2 text-blue-500" />
//             {isLoading ? 'Please wait...' : 'Continue with Google'}
//           </button>
//         </div>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
//             disabled={isLoading}
//           >
//             {isLogin ? 'Sign up' : 'Log in'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  onAuthStateChanged 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Chrome, Mic } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🔍 Automatically check if the user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ User logged in:", user);
        navigate('/'); // Redirect to home or main app
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      try {
        await signInWithPopup(auth, provider);
      } catch (popupError: any) {
        if (popupError.code === 'auth/popup-blocked') {
          setError('Popup was blocked. Redirecting to Google sign-in...');
          await signInWithRedirect(auth, provider);
        } else {
          throw popupError;
        }
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message || (isLogin ? 'Failed to log in' : 'Failed to create account'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8 text-indigo-600">
          <Mic className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">
          Voice-Based App
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isLogin ? 'Sign in to continue to your voice assistant' : 'Create an account to get started'}
        </p>
        
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            <Chrome className="w-5 h-5 mr-2 text-blue-500" />
            {isLoading ? 'Please wait...' : 'Continue with Google'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            disabled={isLoading}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
