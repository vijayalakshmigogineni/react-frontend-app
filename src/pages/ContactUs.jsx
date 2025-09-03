import Navbar from '../components/Navbar';

function ContactUs() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Contact Us</h2>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-md mb-4" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-md mb-4" />
          <textarea placeholder="Your Message" className="w-full px-4 py-2 border rounded-md mb-4 h-32 resize-none" />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-700">Send Message</button>
        </form>
      </div>
    </>
  );
}

export default ContactUs;
