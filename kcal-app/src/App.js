//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DashboardPage from "./components/DashboardPage";
import MyfoodsPage from "./components/MyfoodsPage";
import TodayPage from "./components/TodayPage";
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>

        <Header />

        <Routes>
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route path="/myfoods" element={<MyfoodsPage />} />
            <Route path="/today" element={<TodayPage />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
