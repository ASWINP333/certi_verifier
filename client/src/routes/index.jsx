import { AuthenticationLayout } from '../layouts';
import { Login } from '../pages';

const routes = [
  {
    path: '/',
    element: <AuthenticationLayout />,
    index: true,
    children: [{ path: '', element: <Login /> }],
  },
];

export { routes };