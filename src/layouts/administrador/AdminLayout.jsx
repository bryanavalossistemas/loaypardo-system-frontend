import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../autenticacion/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout() {
  const { usuario, isError, isLoading } = useAuth();
  const navegar = useNavigate();

  if (isLoading) return "Cargando...";
  if (isError) {
    return navegar("/");
  }

  return (
    <div className="h-lvh flex flex-col">
      <Header />
      <Outlet />
      <Toaster position="bottom-center" richColors />
      <Footer />
    </div>
  );
}
