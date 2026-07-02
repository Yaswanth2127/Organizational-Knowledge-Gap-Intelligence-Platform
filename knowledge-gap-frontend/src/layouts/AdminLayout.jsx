import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 min-h-screen bg-gray-100">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;