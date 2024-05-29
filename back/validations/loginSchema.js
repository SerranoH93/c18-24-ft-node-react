import z from "zod";

const loginSchema = z
  .object({
    email: z
      .string({
        required_error: "Email obligatorio",
      })
      .email({
        message: "Email inválido",
      }),
    password: z.string({ required_error: "Contraseña obligatoria" }),
  })
  .strict({
    message: "Campo(s) inválido(s)",
  });

export default loginSchema;
