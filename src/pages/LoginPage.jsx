import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials or user not verified');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] via-[#e2ecf3] to-[#d6e4f0]">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1e3a8a]">Welcome to QFIN</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-[#1e3a8a] text-white py-2 rounded-md hover:bg-[#1c2f6e] transition duration-300"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#1e3a8a] font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
export default LoginPage;
