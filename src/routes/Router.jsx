import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from '@core/layout/AppLayout';
import { appRoutes } from './index.routes';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<AppLayout>{route.element}</AppLayout>}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;