import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function iniciarSesion(datosFormulario) {
  try {
    const ruta = "/usuarios/iniciarSesion";
    const { data } = await api.post(ruta, datosFormulario);
    localStorage.setItem("AUTH_TOKEN", data.token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.mensaje);
    }
  }
}

export async function obtenerUsuario() {
  try {
    const { data } = await api.get("/usuarios/usuario");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.mensaje);
    }
  }
}

// export async function forgotPassword(formData) {
//   try {
//     const ruta = "/auth/forgot-password";
//     const { data } = await api.post(ruta, formData);
//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error);
//     }
//   }
// }

// export async function validateToken(formData) {
//   try {
//     const ruta = "/auth/validate-token";
//     const { data } = await api.post(ruta, formData);
//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error);
//     }
//   }
// }

// export async function updatePasswordWithToken({ formData, token }) {
//   try {
//     const ruta = `/auth/update-password/${token}`;
//     const { data } = await api.post(ruta, formData);
//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error);
//     }
//   }
// }

// export async function getUser() {
//   try {
//     const { data } = await api("/auth/user");
//     const response = userSchema.safeParse(data);
//     if (response.success) {
//       return response.data;
//     }
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error);
//     }
//   }
// }

// export async function checkPassword(formData) {
//   try {
//     const ruta = "/auth/check-password";
//     const { data } = await api.post(ruta, formData);
//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error);
//     }
//   }
// }
