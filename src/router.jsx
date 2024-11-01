import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "@/layouts/home/HomeLayout";
import HomeView from "@/views/home/HomeView";

import AppLayout from "@/layouts/app/AppLayout";
import DashboardView from "@/views/dashboard/DashboardView";
import VendedoresView from "@/views/vendedores/VendedoresView";
import ClientesJuridicosView from "@/views/clientesJuridicos/ClientesJuridicosView";
import ClientesNaturalesView from "@/views/clientesNaturales/ClientesNaturalesView";
import ProveedoresView from "@/views/proveedores/ProveedoresView";
import CategoriasView from "@/views/categorias/CategoriasView";
import MarcasView from "@/views/marcas/MarcasView";
import ProductosView from "@/views/productos/ProductosView";
import ComprasView from "@/views/compras/ComprasView";
import VentasView from "@/views/ventas/VentasView";
import POSView from "@/views/pos/POSView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomeView />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/vendedores" element={<VendedoresView />} />
          <Route
            path="/clientesJuridicos"
            element={<ClientesJuridicosView />}
          />
          <Route
            path="/clientesNaturales"
            element={<ClientesNaturalesView />}
          />
          <Route path="/proveedores" element={<ProveedoresView />} />
          <Route path="/categorias" element={<CategoriasView />} />
          <Route path="/marcas" element={<MarcasView />} />
          <Route path="/productos" element={<ProductosView />} />
          <Route path="/compras" element={<ComprasView />} />
          <Route path="/ventas" element={<VentasView />} />
          <Route path="/pos" element={<POSView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
