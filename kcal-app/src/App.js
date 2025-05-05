import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FeedbackProvider } from './context/FeedbackContext';
import Header from "./containers/Header";
import DashboardPage from "./containers/DashboardPage";
import MyFoodsPage from "./containers/MyFoodsPage";
import TodaysFoodsPage from "./containers/TodaysFoodsPage";
import Footer from './containers/Footer';
import { ConfirmActionProvider } from './context/ConfirmActionContext';
import AuthPage from './containers/AuthPage';

function App() {

  return (
    <ConfirmActionProvider>
      <FeedbackProvider>
        <Router>

            <Header />

            <Routes>
                <Route path="/signup" element={<AuthPage />} />
                <Route exact path="/dashboard" element={<DashboardPage />} />
                <Route path="/myfoods" element={<MyFoodsPage />} />
                <Route path="/today" element={<TodaysFoodsPage />} />
            </Routes>

            <Footer />
        </Router>
      </FeedbackProvider>
    </ConfirmActionProvider>
  );
}

export default App;