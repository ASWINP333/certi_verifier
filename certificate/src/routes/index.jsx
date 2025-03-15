import { DesktopLayout } from '../layouts';
import { Certificate } from '../pages';

const routes = [
  {
    path: '/',
    element: <DesktopLayout />,
    index: true,
    children: [{ path: '/certificate', element: <Certificate /> }],
  },
];

export { routes };
