import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import routes from './routes';
import { logEvent } from './logging-middleware/logger';

// Component to log route changes
const RouteChangeLogger = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent("Route Visit", { path: location.pathname });
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <RouteChangeLogger /> {/* Logs every route change */}
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
