import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("El usuario es obligatorio"),
  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
