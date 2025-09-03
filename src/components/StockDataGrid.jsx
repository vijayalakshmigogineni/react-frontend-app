import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockDataGrid() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stocks')
      .then(res => {
        setStocks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stock data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading market data...</div>;

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-indigo-100 text-indigo-800">
          <tr>
            {["Company", "Ticker", "Close", "Market Cap", "Beta", "P/E", "Dividend Yield", "ROE"].map((header) => (
              <th key={header} className="px-4 py-2 text-left font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, idx) => (
            <tr key={idx} className="hover:bg-indigo-50 transition">
              <td className="px-4 py-2">{stock.Company}</td>
              <td className="px-4 py-2">{stock.Ticker}</td>
              <td className="px-4 py-2">{stock.Close?.toFixed(2)}</td>
              <td className="px-4 py-2">{stock["Market Cap"]?.toLocaleString()}</td>
              <td className="px-4 py-2">{stock.Beta}</td>
              <td className="px-4 py-2">{stock["P/E"]}</td>
              <td className="px-4 py-2">{stock["Dividend Yield"]}</td>
              <td className="px-4 py-2">{stock.ROE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockDataGrid;
