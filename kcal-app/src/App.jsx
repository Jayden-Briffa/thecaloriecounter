import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

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
import { useEffect, useRef } from 'react';

function App() {

  const page = useRef(null);

  useEffect(() => {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const footerHeight = document.querySelector('.footer').offsetHeight;

    page.current.style.minHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;
  }, []);

  return (
    <ConfirmActionProvider>
        <FeedbackProvider>
          <UserContextProvider>
            <Router>

                <Header page={page} />

                <main ref={page} id='page'>

                  <Routes>
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/" element={<AccountPage />} />

                    <Route element={<RequireAuth />}>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/myfoods" element={<MyFoodsPage />} />
                      <Route path="/today" element={<TodaysFoodsPage />} />
                    </Route>

                  </Routes>

                </main>

                <Footer />
            </Router>
          </UserContextProvider>
        </FeedbackProvider>
      </ConfirmActionProvider>
  );
}

export default App;
