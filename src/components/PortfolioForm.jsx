import { useState } from 'react';
import axios from 'axios';

function PortfolioForm({ setPortfolioData }) {
  const [form, setForm] = useState({
    amount: '',
    years: '',
    risk: '',
    stocks: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:8080/api/portfolio/optimize', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPortfolioData(res.data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="number" placeholder="Investment Amount" className="w-full px-4 py-2 border rounded-md" onChange={e => setForm({ ...form, amount: e.target.value })} />
        <input type="number" placeholder="Years" className="w-full px-4 py-2 border rounded-md" onChange={e => setForm({ ...form, years: e.target.value })} />
        <input type="number" placeholder="Risk %" className="w-full px-4 py-2 border rounded-md" onChange={e => setForm({ ...form, risk: e.target.value })} />
        <input type="number" placeholder="Number of Stocks" className="w-full px-4 py-2 border rounded-md" onChange={e => setForm({ ...form, stocks: e.target.value })} />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-6 w-full hover:bg-indigo-700">Optimize Portfolio</button>
    </form>
  );
}

export default PortfolioForm;
