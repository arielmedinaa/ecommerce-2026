import { AuthProvider } from './core/context/AuthProvider';
import Router from './routes/Router';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;