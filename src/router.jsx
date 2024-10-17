import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutHome from "@/layouts/home/LayoutHome";
import VistaHome from "@/views/home/VistaHome";

import AdminLayout from "@/layouts/administrador/AdminLayout";
import VendedorLayout from "@/layouts/vendedor/VendedorLayout";

import VistaDashboard from "@/views/administrador/dashboard/VistaDashboard";
import VistaVendedores from "@/views/administrador/vendedores/VistaVendedores";
import VistaClientes from "@/views/administrador/clientes/VistaClientes";
import VistaProductos from "@/views/administrador/productos/VistaProductos";
import VistaCategorias from "@/views/administrador/categorias/VistaCategorias";
import VistaProveedores from "@/views/administrador/proveedores/VistaProveedores";
import VistaMarcas from "@/views/administrador/marcas/VistaMarcas";
import VistaCompras from "./views/administrador/compras/VistaCompras";
import VistaVentas from "./views/administrador/ventas/VistaVentas";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutHome />}>
          <Route path="/" element={<VistaHome />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/administrador/dashboard" element={<VistaDashboard />} />
          <Route
            path="/administrador/vendedores"
            element={<VistaVendedores />}
          />
          <Route path="/administrador/clientes" element={<VistaClientes />} />
          <Route path="/administrador/productos" element={<VistaProductos />} />
          <Route
            path="/administrador/categorias"
            element={<VistaCategorias />}
          />
          <Route
            path="/administrador/proveedores"
            element={<VistaProveedores />}
          />
          <Route path="/administrador/marcas" element={<VistaMarcas />} />
          <Route path="/administrador/compras" element={<VistaCompras />} />
          <Route path="/administrador/ventas" element={<VistaVentas />} />
        </Route>

        <Route element={<VendedorLayout />}>
          <Route path="/vendedor/ventas" element={<VistaVentas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
