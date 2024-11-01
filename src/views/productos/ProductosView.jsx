import categoriaService from "@/services/CategoriaService";
import productoService from "@/services/ProductoService";
import { useQuery } from "@tanstack/react-query";
import Cabecera from "./components/Cabecera";
import Tabla from "./components/Tabla";
import marcaService from "@/services/MarcaService";

export default function ProductosView() {
  const { data, isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: productoService.getAll,
  });

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: categoriaService.getAll,
  });

  const { data: marcas } = useQuery({
    queryKey: ["marcas"],
    queryFn: marcaService.getAll,
  });
  
  if (isLoading) return "Cargando...";

  if (data && categorias) {
    return (
      <main className="flex-grow flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2">
        <Cabecera />
        <Tabla data={data} categorias={categorias} marcas={marcas} />
      </main>
    );
  }
}
