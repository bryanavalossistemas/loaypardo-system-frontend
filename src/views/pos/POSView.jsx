import { Card } from "@/components/ui/card";
import clienteService from "@/services/ClienteService";
import productoService from "@/services/ProductoService";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import BarraDeBusqueda from "./components/BarraDeBusqueda";
import CarritoVenta from "./components/CarritoVenta";
import ListaDeProductos from "./components/ListaDeProductos";
import useVentasStore from "@/stores/ventasStore";

const columns = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "nombre",
  },
  {
    accessorKey: "imagenUrl",
  },
  {
    accessorKey: "precioVenta",
  },
];

export default function POSView() {
  const resetVenta = useVentasStore((state) => state.resetVenta);

  const { data, isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: productoService.getAll,
  });

  const { data: clientes } = useQuery({
    queryKey: ["clientes"],
    queryFn: clienteService.getAll,
  });

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });
  const [columnFilters, setColumnFilters] = useState([]);

  const tabla = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnFilters,
    },
  });

  useEffect(() => {
    resetVenta();
  }, []);

  if (isLoading) return "...cargando";

  if (data && clientes) {
    return (
      <main className="flex-1 flex py-1 pl-1 sm:p-2 gap-x-2 overflow-auto">
        <Card className="basis-4/4 pr-1 p-1 sm:p-2 rounded-md sm:basis-3/4 flex flex-col gap-y-1 sm:gap-y-2">
          <BarraDeBusqueda tabla={tabla} />
          <div className="overflow-y-auto">
            <ListaDeProductos tabla={tabla} />
          </div>
        </Card>
        <div className="sm:basis-1/4">
          <CarritoVenta clientes={clientes} />
        </div>
      </main>
    );
  }
}
