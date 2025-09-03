import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({
    name: '', dob: '', phone: '', email: '',
    password: '', confirmPassword: '', otp: ''
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ['name', 'dob', 'phone', 'email', 'password', 'confirmPassword', 'otp'];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1')}`);
        return;
      }
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prepare payload
    const { name, confirmPassword, ...rest } = form;
    const payload = { ...rest, username: name };

    try {
      await axios.post('http://localhost:8080/api/auth/register', payload);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] via-[#e2ecf3] to-[#d6e4f0]">
      <form onSubmit={handleRegister} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1e3a8a]">Create Your QFIN Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="date"
          value={form.dob}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, dob: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        />

        <input
          type="text"
          placeholder="OTP"
          value={form.otp}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setForm({ ...form, otp: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-[#1e3a8a] text-white py-2 rounded-md hover:bg-[#1c2f6e] transition duration-300"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-[#1e3a8a] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
