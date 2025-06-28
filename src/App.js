import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import UploadForm from './components/UploadForm';
import EditOutfitForm from './components/EditOutfitForm';
import OutfitDetails from './components/OutfitDetails';
import SearchResults from './components/SearchResults';
import ExplorePage from './components/ExplorePage';
import ErrorPage from './components/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <LoginForm /> },
        { path: 'signup', element: <SignupForm /> },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: 'upload',
          element: (
            <ProtectedRoute>
              <UploadForm />
            </ProtectedRoute>
          ),
        },
        {
          path: 'outfits/:id/edit',
          element: (
            <ProtectedRoute>
              <EditOutfitForm />
            </ProtectedRoute>
          ),
        },
        { path: 'outfits/:id', element: <OutfitDetails /> },
        { path: 'search', element: <SearchResults /> },
        {
          path: 'explore',
          element: (
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
