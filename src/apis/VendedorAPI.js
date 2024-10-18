import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function obtenerVendedores() {
  try {
    const { data } = await api.get("/vendedores");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.mensaje);
    }
  }
}

export async function crearVendedor(datosFormulario) {
  try {
    const { data } = await api.post("/vendedores", datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.mensaje);
    }
  }
}
