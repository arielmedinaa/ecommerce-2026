import { useAuth } from '../core/context/AuthProvider';
import AppLayout from '../core/layout/AppLayout';
//import LoginPage from '../pages/LoginPage';
import Home from "@features/home/Home";

const Router = () => {
  const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <LoginPage />;
//   }

  return (
    <AppLayout>
      <Home />
    </AppLayout>
  );
};

export default Router;