import { useState } from 'react';
import Navbar from '../components/Navbar';
import PortfolioCharts from '../components/PortfolioCharts';

function CreatePortfolio() {
  const [form, setForm] = useState({
    amount: '',
    years: '',
    risk: 50,
    stocks: ''
  });
  const [result, setResult] = useState(null);

  const optimizePortfolio = (riskValue) => {
    const mockAllocation = Array.from({ length: Number(form.stocks) }, (_, i) => ({
      company: `Company ${i + 1}`,
      stock: `STK${i + 1}`,
      weight: (100 / form.stocks).toFixed(2),
      return: (10 + i).toFixed(2),
      volatility: (5 + i).toFixed(2),
      beta: (0.8 + i * 0.1).toFixed(2)
    }));

    const mockMetrics = {
      expectedReturn: (riskValue * 0.2).toFixed(2),
      volatility: (riskValue * 0.15).toFixed(2),
      sharpeRatio: (riskValue / 10).toFixed(2),
      var95: (-riskValue * 0.13).toFixed(2),
      cvar95: (-riskValue * 0.16).toFixed(2),
      roi5yr: (riskValue * 1.2).toFixed(2)
    };

    setResult({ allocation: mockAllocation, metrics: mockMetrics });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    optimizePortfolio(form.risk);
  };

  const handleRiskChange = (e) => {
    const newRisk = Number(e.target.value);
    setForm({ ...form, risk: newRisk });
    if (result) optimizePortfolio(newRisk);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Create Your Portfolio</h2>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" placeholder="Investment Amount" className="w-full px-4 py-2 border rounded-md" onChange={e => setForm({ ...form, amount: e.target.value })} />
            <input type="number" placeholder="Years" className="w-full px-4 py-2 border rounded-md" onChange={e => setForm({ ...form, years: e.target.value })} />
             <input type="number" placeholder="Risk Level (%)" min="0" max="100" value={form.risk} className="w-full px-4 py-2 border rounded-md" onChange={handleRiskChange}
            />
            <input type="number" placeholder="Number of Stocks" className="w-full px-4 py-2 border rounded-md" onChange={e => setForm({ ...form, stocks: e.target.value })} />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md col-span-2 hover:bg-indigo-700">Optimize Portfolio</button>
          </form>

          {result && (
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level: {form.risk}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={form.risk}
                onChange={handleRiskChange}
                className="w-full mb-6"
              />
              <div className="w-full h-4 bg-gray-200 rounded-full mb-6">
                <div className="h-4 bg-red-500 rounded-full" style={{ width: `${form.risk}%` }}></div>
              </div>

              <PortfolioCharts data={result} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreatePortfolio;
