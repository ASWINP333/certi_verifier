import { AuthenticationLayout, DesktopLayout } from '../layouts';
import {
  CreateInstition,
  Dashboard,
  ForgotPassword,
  InstitutionList,
  Login,
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
    element: <DesktopLayout />,
    index: true,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'institutions', element: <InstitutionList /> },
      { path: 'institutions/create', element: <CreateInstition /> },
    ],
  },
];

export { routes };
