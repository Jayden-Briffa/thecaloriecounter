//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./containers/Header";
import DashboardPage from "./containers/DashboardPage";
import MyFoodsPage from "./containers/MyFoodsPage";
import TodayPage from "./containers/TodayPage";
import Footer from './containers/Footer';

function App() {
  return (
    <>
      <Router>

        <Header />

        <Routes>
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route path="/myfoods" element={<MyFoodsPage />} />
            <Route path="/today" element={<TodayPage />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
