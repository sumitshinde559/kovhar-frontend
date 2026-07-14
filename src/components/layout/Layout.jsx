import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FCFCFD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </>
  );
}

export default Layout;
