import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FeedbackProvider } from './context/FeedbackContext';
import { ConfirmActionProvider } from './context/ConfirmActionContext';
import Header from "./containers/Header";
import DashboardPage from "./containers/DashboardPage";
import MyFoodsPage from "./containers/MyFoodsPage";
import TodaysFoodsPage from "./containers/TodaysFoodsPage";
import Footer from './containers/Footer';
import AccountPage from './containers/AccountPage';
import { UserContextProvider } from './context/userContext';

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
                  <Route exact path="/dashboard" element={<DashboardPage />} />
                  <Route path="/myfoods" element={<MyFoodsPage />} />
                  <Route path="/today" element={<TodaysFoodsPage />} />
              </Routes>

              <Footer />
          </Router>
        </FeedbackProvider>
      </ConfirmActionProvider>
    </UserContextProvider>
  );
}

export default App;