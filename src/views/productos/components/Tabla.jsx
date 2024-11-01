import TablaUi from "@/components/ui/Tabla";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import BotonCrear from "./BotonCrear";
import BotonEditar from "./BotonEditar";
import BotonEliminar from "./BotonEliminar";
import formatCurrency from "@/utils/formatCurrency";

export default function Tabla({ data, categorias, marcas }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.getValue("id"),
    },
    {
      accessorKey: "imagenUrl",
      header: "Imagen",
      cell: ({ row }) => (
        <div className="flex max-w-20">
          <img
            className="object-contain object-center rounded-sm"
            src={row.getValue("imagenUrl")}
            alt="imagen"
          />
        </div>
      ),
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => row.getValue("nombre"),
    },
    {
      accessorKey: "precioCosto",
      header: "Precio Costo",
      cell: ({ row }) => formatCurrency(row.getValue("precioCosto")),
    },
    {
      accessorKey: "precioVenta",
      header: "Precio Venta",
      cell: ({ row }) => formatCurrency(row.getValue("precioVenta")),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => row.getValue("stock"),
    },
    {
      accessorKey: "categoria",
      header: "Categoría",
      cell: ({ row }) => row.getValue("categoria"),
    },
    {
      accessorKey: "marca",
      header: "Marca",
      cell: ({ row }) => row.getValue("marca"),
    },
    {
      id: "actions",
      header: () => {
        return <span className="flex justify-end"></span>;
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-x-1 justify-end">
            <div className="hidden sm:block">
              <BotonEditar
                data={row.original}
                categorias={categorias}
                marcas={marcas}
              />
            </div>
            <BotonEliminar data={row.original} />
          </div>
        );
      },
    },
  ];

  const tabla = useReactTable({
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
    },
  });

  return (
    <TablaUi
      tabla={tabla}
      placeholder={"Buscar producto ..."}
      BotonCrear={<BotonCrear categorias={categorias} marcas={marcas} />}
    />
  );
}
