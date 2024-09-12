import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShellMain from './components/DashboardAppShell/DashboardAppShell';
import Dashboard from './pages/Dashboard.page';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
