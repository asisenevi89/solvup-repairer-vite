import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from  'react-router-dom';
import { ThemeProvider } from '@mui/material';
import globalTheme from './Ui/Themes/global';
import './global.scss';

const Home = lazy(() => import("./Components/Pages"));
const NotFound = lazy(() => import('./Components/Pages/NotFound'));
const RepairerList = lazy(() => import('./Components/Pages/RepairerList'));
const RepairerAction = lazy(() => import( './Components/Pages/RepairerAction'));
const Configure = lazy(() => import('./Components/Pages/Configure'));
const MainLayout = lazy(() => import('./Components/Layouts/MainLayout'));
const SecureRoute = lazy(() => import('./Components/Common/SecureRoute'));

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <Router>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/not-found"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="/repairer-list"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SecureRoute>
                     <RepairerList />
                  </SecureRoute>
                </Suspense>
              }
            />
            <Route
              path="/repairer-action/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SecureRoute>
                    <RepairerAction />
                  </SecureRoute>
                </Suspense>
              }
            />
            <Route
              path="/configure"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SecureRoute>
                    <Configure />
                  </SecureRoute>
                </Suspense>
              }
            />
            <Route
              path="*"
              element={<Navigate to="/not-found" replace />}
            />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
