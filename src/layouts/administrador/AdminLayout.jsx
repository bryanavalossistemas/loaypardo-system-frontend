import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../autenticacion/components/Footer";

export default function AdminLayout() {
  return (
    <div className="h-lvh flex flex-col">
      <Header />
      <Outlet />
      <Toaster position="bottom-center" richColors />
      <Footer />
    </div>
  );
}
