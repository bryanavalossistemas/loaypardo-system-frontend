import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "@/components/ui/Footer";
import { useAutenticacion } from "@/hooks/UseAutenticacion";

export default function AdminLayout() {
  const { usuario, isError, isLoading } = useAutenticacion();
  const navegar = useNavigate();

  if (isLoading) return "Cargando...";
  if (isError) {
    return navegar("/");
  }

  return (
    <div className="h-lvh flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}