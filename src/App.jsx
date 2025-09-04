import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreatePortfolio from './pages/CreatePortfolio';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import VerifyOtpPage from './pages/VerifyOtpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-portfolio" element={<CreatePortfolio />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
