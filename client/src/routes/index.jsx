import { RequireAuth } from '../contexts/authContext';
import { AuthenticationLayout, DesktopLayout } from '../layouts';
import {
  CreateInstition,
  CreateUser,
  Dashboard,
  ForgotPassword,
  InstitutionList,
  Login,
  UsersList,
  VerifyOtp,
} from '../pages';

const routes = [
  {
    path: '/',
    element: <AuthenticationLayout />,
    index: true,
    children: [
      { path: '', element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot', element: <ForgotPassword /> },
      { path: 'otp-verify', element: <VerifyOtp /> },
    ],
  },
  {
    path: 'user',
    element: (
      <RequireAuth>
        <DesktopLayout />
      </RequireAuth>
    ),
    index: true,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'institutions', element: <InstitutionList /> },
      { path: 'institutions/create', element: <CreateInstition /> },
      { path: 'users', element: <UsersList /> },
      { path: 'users/create', element: <CreateUser /> },
    ],
  },
];

export { routes };
