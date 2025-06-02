import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FeedbackProvider } from './context/FeedbackContext';
import { ConfirmActionProvider } from './context/ConfirmActionContext';
import Header from "./containers/Header";
import DashboardPage from "./containers/(pages)/dashboard/DashboardPage";
import MyFoodsPage from "./containers/(pages)/myfoods/MyFoodsPage";
import TodaysFoodsPage from "./containers/(pages)/today/TodaysFoodsPage";
import Footer from './containers/Footer';
import AccountPage from './containers/(pages)/account/AccountPage';
import { UserContextProvider } from './context/userContext';
import RequireAuth from './containers/RequireAuth';

function App() {

  return (
    <UserContextProvider>
      <ConfirmActionProvider>
        <FeedbackProvider>
          <Router>

              <Header />

                <Routes>
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/" element={<AccountPage />} />
                  <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/myfoods" element={<MyFoodsPage />} />
                    <Route path="/today" element={<TodaysFoodsPage />} />
                  </Route>
                </Routes>

              <Footer />
          </Router>
        </FeedbackProvider>
      </ConfirmActionProvider>
    </UserContextProvider>
  );
}

export default App;