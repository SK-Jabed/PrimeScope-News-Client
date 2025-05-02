import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Dynamic Content Starts Here*/}
      <div className="min-h-[calc(100vh-88px)]">
        <Outlet />
      </div>
      {/* Dynamic Content Ends Here*/}
      <Footer />
    </div>
  );
};

export default MainLayout;