import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import AuthProvider from './contexts/authContext';

function App() {
  const renderRoute = (route) =>
    route.children && route.children.length > 0 ? (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children.map(renderRoute)}
      </Route>
    ) : (
      <Route key={route.path} path={route.path} element={route.element} />
    );

  return (
    <AuthProvider>
      <Routes>{routes.map(renderRoute)}</Routes>
    </AuthProvider>
  );
}

export default App;
