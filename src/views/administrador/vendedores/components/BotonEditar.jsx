import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UpdateButton as UpdateButtonComponent } from "./UpdateButton";
import { z } from "zod";
import apiVendedores from "@/apis/Vendedores";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BotonEditar({ vendedor, obtenerVendedores }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, {
          message: "El nombre del vendedor es requerido",
        }),
        usuario: z.string().min(1, {
          message: "El nombre de usuario del vendedor es requerido",
        }),
        contrasenia: z.string().min(1, {
          message: "La contraseña del vendedor es requerida",
        }),
        dni: z.coerce
          .number({
            required_error: "El DNI del vendedor es requerido",
            invalid_type_error: "El DNI del vendedor debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 8,
            "El DNI del vendedor debe tener 8 dígitos"
          ),
        celular: z.coerce
          .number({
            required_error: "El celular del vendedor es requerido",
            invalid_type_error: "El celular del vendedor debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 9,
            "El celular del vendedor debe tener 9 dígitos"
          ),
      })
    ),
    values: {
      nombre: vendedor.nombre,
      usuario: vendedor.usuario,
      contrasenia: "",
      dni: vendedor.dni,
      celular: vendedor.celular,
    },
  });

  async function handleSubmit(data) {
    try {
      const respuesta = await apiVendedores.actualizarVendedor(
        vendedor.id,
        data
      );
      if (!respuesta.ok) {
        toast.error(respuesta.message);
        return;
      }
      toast.success("Vendedor actualizado correctamente");
      setOpen(false);
      obtenerVendedores();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateButtonComponent onClick={() => form.reset()} />
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center">
                  Editar Vendedor
                </CardTitle>
                <CardDescription className="text-center">
                  Realice cambios del vendedor aquí. Haga clic en guardar cuando
                  haya terminado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="flex gap-x-3">
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                    Guardar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}