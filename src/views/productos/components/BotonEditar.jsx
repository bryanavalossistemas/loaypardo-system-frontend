import BotonEditarUi from "@/components/ui/BotonEditar";
import productoService from "@/services/ProductoService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";

export default function BotonEditar({ data, categorias, marcas }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = {
    nombre: data.nombre,
    precioCosto: data.precioCosto,
    precioVenta: data.precioVenta,
    stock: data.stock,
    categoriaId: data.categoriaId,
    marcaId: data.marcaId,
    imagenUrl: data.imagenUrl,
    imagen: undefined,
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z
          .string()
          .min(1, { message: "⚠️ ¡Atención! El nombre es obligatorio." }),
        precioCosto: z.coerce.number().positive({
          message: "⚠️ ¡Atención! El precio de costo es obligatorio.",
        }),
        precioVenta: z.coerce.number().positive({
          message: "⚠️ ¡Atención! El precio de venta es obligatorio.",
        }),
        stock: z.coerce
          .number()
          .int({
            message: "🌟 ¡Casi listo! Ingresa un número entero, por favor. 😊",
          })
          .positive({ message: "⚠️ ¡Atención! El stock es obligatorio." }),
        categoriaId: z.coerce
          .number()
          .positive({ message: "⚠️ ¡Por favor! Selecciona una categoría." }),
        marcaId: z.coerce
          .number()
          .positive({ message: "⚠️ ¡Por favor! Selecciona una marca." }),
        imagen: z.instanceof(FileList),
      })
    ),
    values: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: productoService.update,
    onError: (error) => {
      if (error.response?.data?.errors) {
        const errores = error.response.data.errors;
        errores.forEach((error) => {
          formulario.setError(error.path, {
            type: "manual",
            message: error.message,
          });
        });
        return;
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      formulario.reset();
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      setOpen(false);
      toast.success("Producto actualizado correctamente");
    },
  });

  const handleEditar = (formData) => {
    const payload = new FormData();
    payload.append("nombre", formData.nombre);
    payload.append("precioCosto", formData.precioCosto);
    payload.append("precioVenta", formData.precioVenta);
    payload.append("stock", formData.stock);
    payload.append("categoriaId", formData.categoriaId);
    payload.append("marcaId", formData.marcaId);
    if (formData.imagen[0]) {
      payload.append("imagen", formData.imagen[0]);
    }
    mutate({ id: data.id, payload });
  };
  return (
    <BotonEditarUi
      recurso={"producto"}
      formulario={formulario}
      CamposFormulario={
        <CamposFormulario
          formulario={formulario}
          categorias={categorias}
          marcas={marcas}
        />
      }
      handleEditar={handleEditar}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
      className={"max-w-4xl"}
    />
  );
}
