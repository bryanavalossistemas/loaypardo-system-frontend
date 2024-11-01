import BotonCrearUi from "@/components/ui/BotonCrear";
import productoService from "@/services/ProductoService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";

export default function BotonCrear({ categorias, marcas }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = {
    nombre: "",
    precioCosto: "",
    precioVenta: "",
    stock: "",
    categoriaId: "",
    marcaId: "",
    imagen: "",
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
        imagen: z
          .instanceof(FileList, {
            message: "📷 ¡Atención! Selecciona una imagen, por favor.",
          })
          .refine(
            (files) => files.length > 0,
            "📷 ¡Atención! Selecciona una imagen, por favor."
          )
          .refine(
            (files) => files[0]?.type.startsWith("image/"),
            "📎 Nota: Envía un archivo en formato de imagen."
          ),
      })
    ),
    defaultValues: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: productoService.create,
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
      toast.success("Producto creado correctamente");
    },
  });

  const handleCrear = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("precioCosto", data.precioCosto);
    formData.append("precioVenta", data.precioVenta);
    formData.append("stock", data.stock);
    formData.append("categoriaId", data.categoriaId);
    formData.append("marcaId", data.marcaId);
    formData.append("imagen", data.imagen[0]);
    mutate({ payload: formData });
  };

  return (
    <BotonCrearUi
      recurso={"producto"}
      formulario={formulario}
      CamposFormulario={
        <CamposFormulario
          formulario={formulario}
          categorias={categorias}
          marcas={marcas}
        />
      }
      handleCrear={handleCrear}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
      className={"max-w-4xl"}
    />
  );
}
