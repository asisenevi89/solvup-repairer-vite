import { BrowserRouter as Router, Routes, Route, Navigate } from  'react-router-dom';
import { ThemeProvider } from '@mui/material';
import globalTheme from './Ui/Themes/global';
import './global.scss';

import Home from "./Components/Pages";
import NotFound from './Components/Pages/NotFound';
import RepairerList from './Components/Pages/RepairerList';
import RepairerAction from './Components/Pages/RepairerAction';
import Configure from './Components/Pages/Configure';
import MainLayout from './Components/Layouts/MainLayout';
import SecureRoute from './Components/Common/SecureRoute';

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <Router>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/not-found"
              element={<NotFound />}
            />
            <Route
              path="/repairer-list"
              element={
                <SecureRoute>
                  <RepairerList />
                </SecureRoute>
              }
            />
            <Route
              path="/repairer-action/:id"
              element={
                <SecureRoute>
                  <RepairerAction />
                </SecureRoute>
              }
            />
            <Route
              path="/configure"
              element={
                <SecureRoute>
                  <Configure />
                </SecureRoute>
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
