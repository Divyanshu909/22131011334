import Home from './pages/Home';
import Stats from './pages/Stats';
import Redirect from './pages/Redirect';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/stats', element: <Stats /> },
  { path: '/:shortcode', element: <Redirect /> },
];

export default routes;
