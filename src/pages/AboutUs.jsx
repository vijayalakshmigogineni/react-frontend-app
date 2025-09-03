import Navbar from '../components/Navbar';

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">About QFIN</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          QFIN is a quantum-powered portfolio optimization platform designed to help investors make smarter decisions.
          We combine classical financial models with cutting-edge quantum algorithms to deliver personalized, risk-aware investment strategies.
          Our mission is to democratize access to advanced financial tools and empower users with data-driven insights.
        </p>
      </div>
    </>
  );
}

export default AboutUs;
