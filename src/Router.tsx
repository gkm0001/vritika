import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppShellMain from './components/DashboardAppShell/DashboardAppShell';
import LoginPage from './pages/Login.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <AppShellMain />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
