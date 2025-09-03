import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/qfin-logo.png';

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="QFIN" className="h-8" />
        <span className="text-2xl font-bold text-indigo-600">QFIN</span>
      </div>
      <div className="space-x-6">
        <Link to="/home" className="text-gray-700 font-medium hover:text-indigo-600 transition">Home</Link>
        <Link to="/create-portfolio" className="text-gray-700 font-medium hover:text-indigo-600 transition">Create Portfolio</Link>
        <Link to="/about" className="text-gray-700 font-medium hover:text-indigo-600 transition">About Us</Link>
        <Link to="/contact" className="text-gray-700 font-medium hover:text-indigo-600 transition">Contact Us</Link>
        <button onClick={logout} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
