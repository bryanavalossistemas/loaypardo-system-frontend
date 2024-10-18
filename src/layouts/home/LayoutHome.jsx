import Header from "@/components/layouts/home/Header";
import Footer from "@/components/layouts/home/Footer";
import { Outlet } from "react-router-dom";

export default function LayoutHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
