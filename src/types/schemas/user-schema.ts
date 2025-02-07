import z from "zod";

export const userSchema = z.object({
  username: z.string().nonempty("El nombre de usuario es obligatorio"),
  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(5, "La contraseña debe tener al menos 5 caracteres"),
  email: z
    .string()
    .nonempty("El email es obligatorio")
    .email("Ingrese una dirección de correo valida"),
  msisdn: z
    .string()
    .nonempty("El msisdn es obligatorio")
    .min(8, "El msisdn debe tener 8 digitos"),
});

export type UserInput = z.infer<typeof userSchema>;
