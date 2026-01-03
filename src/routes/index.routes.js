import { homeRoutes } from '@features/home/routes.jsx';
import { catalogRoutes } from '@features/catalog/routes.jsx';

export const appRoutes = [
  ...homeRoutes,
  ...catalogRoutes
];

export const navigation = appRoutes.map(route => ({
  path: route.path,
  label: route.label
}));