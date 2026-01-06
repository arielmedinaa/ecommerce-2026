import { homeRoutes } from '@features/home/routes.jsx';
import { catalogRoutes } from '@features/catalog/routes.jsx';
import { paymentRoutes } from '../features/payments/routes';

export const appRoutes = [
  ...homeRoutes,
  ...catalogRoutes,
  ...paymentRoutes
];

export const navigation = appRoutes.map(route => ({
  path: route.path,
  label: route.label
}));