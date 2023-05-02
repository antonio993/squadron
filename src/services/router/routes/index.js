import ErrorPage from '../../../components/views/ErrorPage';
import App from '../../../components/views/App';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Login from '../../../components/views/Login';
import Connector from '../../../components/views/Connector';
import Home from '../../../components/views/Home';

export const routes = [
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/home',
            element: <Home />
          },
          {
            path: '/connector',
            element: <Connector />
          }
        ]
      }
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
];