import z from "zod";

const userRegisterSchema = z
  .object({
    email: z
      .string({
        required_error: "Email obligatorio",
      })
      .email({
        message: "Email invalido",
      }),
    first_name: z
      .string({
        required_error: "Nombre obligatorio",
      })
      .min(3, {
        message: "Tu nombre debe tener al menos 3 caracteres",
      })
      .max(50, {
        message: "Tu nombre no debe tener más de 50 caracteres",
      }),
    last_name: z
      .string()
      .min(3, {
        message: "Tu apellido debe tener al menos 3 caracteres",
      })
      .max(50, {
        message: "Tu apellido no debe tener más de 50 caracteres",
      })
      .optional(),
    genre: z.enum(["male", "female", "other"], {
      message: "Género inválido",
    }),
    password: z
      .string({
        required_error: "Contraseña obligatoria",
      })
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .max(50, {
        message: "La contraseña no debe tener más de 50 caracteres",
      }),
  })
  .strict({
    message: "Campo(s) inválido(s)",
  });

export default userRegisterSchema;
