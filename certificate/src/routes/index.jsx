import { RequireAuth } from '../contexts/authContext';
import { DesktopLayout } from '../layouts';
import { Certificate, Certificates, Login, VerifyCertificate } from '../pages';

const routes = [
  {
    path: '/',
    element: <DesktopLayout />,
    index: true,
    children: [
      { path: '/certificate', element: <Certificate /> },
      { path: '/login', element: <Login /> },
      { path: '/', element: <VerifyCertificate /> },
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
    children: [{ path: 'certificates', element: <Certificates /> }],
  },
];

export { routes };
