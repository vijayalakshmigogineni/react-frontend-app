import Navbar from '../components/Navbar';
import StockDataGrid from '../components/StockDataGrid';
import StockTable from '../components/StockTable';

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Live Market Overview</h2>
        <div className="max-w-6xl mx-auto">
          <StockDataGrid />
        </div>
      </div>
    </>
  );
}

export default HomePage;
