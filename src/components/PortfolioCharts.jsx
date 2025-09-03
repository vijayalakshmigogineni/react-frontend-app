import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const generateColors = (count) => {
  const palette = [
    '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6',
    '#EC4899', '#F97316', '#22D3EE', '#A3E635', '#F43F5E', '#EAB308',
    '#14B8A6', '#7C3AED', '#D946EF', '#4ADE80', '#FACC15'
  ];
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
};

function PortfolioCharts({ data }) {
  if (!data || !data.allocation || data.allocation.length === 0) {
    return (
      <div className="text-center text-gray-500">No portfolio data available.</div>
    );
  }

  const pieData = {
    labels: data.allocation.map(a => a.stock),
    datasets: [{
      data: data.allocation.map(a => Number(a.weight)),
      backgroundColor: generateColors(data.allocation.length)
    }]
  };

  const barData = {
    labels: ['Expected Return', 'Volatility', 'Sharpe Ratio'],
    datasets: [{
      label: 'Metrics',
      data: [
        Number(data.metrics.expectedReturn),
        Number(data.metrics.volatility),
        Number(data.metrics.sharpeRatio)
      ],
      backgroundColor: '#3B82F6'
    }]
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-indigo-600">Portfolio Allocation</h3>
      <Pie data={pieData} />

      <h3 className="text-xl font-semibold mt-8 mb-4 text-indigo-600">Risk Metrics</h3>
      <Bar data={barData} />

      <h3 className="text-xl font-semibold mt-8 mb-4 text-indigo-600">Company Allocation</h3>
      <table className="min-w-full bg-white border rounded-md mb-6">
        <thead className="bg-indigo-100">
          <tr>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Weight (%)</th>
            <th className="px-4 py-2 text-left">Return (%)</th>
            <th className="px-4 py-2 text-left">Volatility (%)</th>
            <th className="px-4 py-2 text-left">Beta</th>
          </tr>
        </thead>
        <tbody>
          {data.allocation.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{item.company}</td>
              <td className="px-4 py-2">{item.stock}</td>
              <td className="px-4 py-2">{item.weight}</td>
              <td className="px-4 py-2">{item.return}</td>
              <td className="px-4 py-2">{item.volatility}</td>
              <td className="px-4 py-2">{item.beta}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mb-4 text-indigo-600">Portfolio Metrics</h3>
      <table className="min-w-full bg-white border rounded-md">
        <tbody>
          {Object.entries(data.metrics).map(([key, value], i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2 font-medium">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</td>
              <td className="px-4 py-2">{value}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PortfolioCharts;
