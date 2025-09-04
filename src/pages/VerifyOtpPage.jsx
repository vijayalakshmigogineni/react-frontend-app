import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from location state or localStorage fallback
    const passedEmail = location.state?.email || localStorage.getItem('pendingEmail');
    if (passedEmail) {
      setEmail(passedEmail);
    } else {
      alert("No email found. Please register first.");
      navigate('/register');
    }
  }, [location, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      alert("Please enter both email and OTP");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/verify', { email, otp });
      alert(res.data); // "User verified"
      navigate('/login');
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert('Invalid OTP or verification failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/resend-otp', { email });
      alert(res.data); // "New OTP sent"
    } catch (err) {
      console.error("Resend OTP failed:", err);
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] via-[#e2ecf3] to-[#d6e4f0]">
      <form onSubmit={handleVerify} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1e3a8a]">Verify Your Account</h2>

        <input
          type="email"
          value={email}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 bg-gray-100 text-gray-600"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition duration-200"
          onChange={e => setOtp(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-[#1e3a8a] text-white py-2 rounded-md hover:bg-[#1c2f6e] transition duration-300"
        >
          Verify OTP
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-sm text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerifyOtpPage;
