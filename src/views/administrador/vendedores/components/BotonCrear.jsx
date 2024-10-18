import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearVendedor } from "@/apis/VendedorAPI";
import BotonCrearUi from "@/components/administrador/BotonCrear";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function BotonCrear() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const valoresIniciales = {
    nombre: "",
    usuario: "",
    contrasenia: "",
    dni: "",
    telefono: "",
    celular: "",
    correo: "",
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().regex(/^.+$/, "El nombre del vendedor es requerido"),
        usuario: z
          .string()
          .regex(/^.+$/, "El usuario del vendedor es requerido"),
        contrasenia: z
          .string()
          .regex(/^.+$/, "La contraseña del vendedor es requerida"),
        dni: z
          .string()
          .regex(/^\d{8}$/, "El dni del vendedor debe tener 8 dígitos"),
        telefono: z
          .string()
          .regex(/^(\d{7})?$/, "El teléfono del vendedor debe tener 7 dígitos"),
        celular: z
          .string()
          .regex(/^(\d{9})?$/, "El celular del vendedor debe tener 9 dígitos"),
        correo: z
          .string()
          .regex(
            /^$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "El correo del vendedor no es válido"
          ),
      })
    ),
    defaultValues: valoresIniciales,
  });

  const { mutate } = useMutation({
    mutationFn: crearVendedor,
    onError: (error) => {
      setOpen(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vendedores"] });
      setOpen(false);
      toast.success(data);
    },
  });

  const handleCrearVendedor = (datosFormulario) => mutate(datosFormulario);

  return (
    <>
      <BotonCrearUi onClick={() => setOpen(true)} recurso={"Vendedor"} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-teal-600">Crear Vendedor</DialogTitle>
            <DialogDescription>
              Agregue un vendedor aquí. Haga clic en guardar cuando haya
              terminado.
            </DialogDescription>
          </DialogHeader>
          <Form {...formulario}>
            <form
              className="space-y-4"
              onSubmit={formulario.handleSubmit(handleCrearVendedor)}
            >
              <div className="space-y-2">
                <FormField
                  control={formulario.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bryan Avalos Loa y Pardo Jesus"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="usuario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="goku123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="contrasenia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="75013015"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono del vendedor</FormLabel>
                      <FormControl>
                        <Input placeholder="4746922" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="celular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="915115894"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="correo@correo.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-x-2">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
                <Button
                  disabled={formulario.formState.isSubmitting}
                  type="submit"
                >
                  Guardar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
