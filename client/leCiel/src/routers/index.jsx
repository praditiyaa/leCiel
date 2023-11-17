import { createBrowserRouter, redirect } from 'react-router-dom';
import ReadingListPage from '../views/ReadingListPage';
import RegisterPage from '../views/RegisterPage';
import HistoryPage from '../views/HistoryPage';
import ReadChapter from '../views/ReadChapter';
import DetailPage from '../views/DetailPage';
import LoginPage from '../views/LoginPage';
import Navbar from '../components/Navbar';
import HomePage from '../views/HomePage';

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        element: <HomePage />,
        path: '/',
      },
      {
        element: <DetailPage />,
        path: '/detail/:mangaId',
      },
      {
        element: <ReadingListPage />,
        path: '/readingList',
        loader: async () => {
          if (!localStorage.access_token) return redirect('/login');
          return null;
        },
      },
      {
        element: <HistoryPage />,
        path: '/history',
        loader: async () => {
          if (!localStorage.access_token) return redirect('/login');
          return null;
        },
      },
      {
        element: <LoginPage />,
        path: '/login',
        loader: async () => {
          if (localStorage.access_token) return redirect('/');
          return null;
        },
      },
      {
        element: <RegisterPage />,
        path: '/register',
        loader: async () => {
          if (localStorage.access_token) return redirect('/');
          return null;
        },
      },
    ],
  },
  {
    element: <ReadChapter />,
    path: '/detail/:mangaId/chapter/:chapterId',
  },
]);

export default router;
