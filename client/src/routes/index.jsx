import { RequireAuth } from '../contexts/authContext';
import { AuthenticationLayout, DesktopLayout } from '../layouts';
import {
  CertificateList,
  CreateCertificate,
  CreateInstition,
  CreateStudent,
  CreateTemplate,
  CreateUser,
  Dashboard,
  ForgotPassword,
  InstitutionList,
  Login,
  Report,
  Settings,
  StudentList,
  Templates,
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
      { path: 'certificates', element: <CertificateList /> },
      { path: 'certificates/create', element: <CreateCertificate /> },
      { path: 'templates', element: <Templates /> },
      { path: 'templates/create', element: <CreateTemplate /> },
      { path: 'settings', element: <Settings /> },
      { path: 'report', element: <Report /> },
      { path: 'students', element: <StudentList /> },
      { path: 'students/create', element: <CreateStudent /> },
    ],
  },
];

export { routes };
