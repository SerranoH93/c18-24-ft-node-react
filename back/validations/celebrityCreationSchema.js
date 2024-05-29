import z from "zod";

const celebrityCreationSchema = z
  .object({
    celebrity_alias: z
      .string({
        required_error: "Usuario (alias) obligatorio",
      })
      .min(3, {
        message: "Tu usuario (alias) debe tener al menos 3 caracteres",
      })
      .max(15, {
        message: "Tu usuario (alias) no debe tener más de 15 caracteres",
      }),
    id_number: z
      .string({
        required_error: "Número de DNI o pasaporte obligatorio",
      })
      .min(7, {
        message:
          "Tu número de DNI o pasaporte debe tener al menos 7 caracteres",
      })
      .max(20, {
        message:
          "Tu número de DNI o pasaporte no debe tener más de 20 caracteres",
      })
      .regex(/^[0-9]{7,20}$/, {
        message: "No incluyas letras ni caracteres especiales",
      }),
    birthdate: z
      .string({ required_error: "Fecha de nacimiento obligatoria" })
      .date({ message: "Fecha de nacimiento en formato incorrecto" }),
    active_region: z.string({
      required_error: "País o región de actividad obligatoria",
    }),
    category: z.string({
      required_error: "Categoría obligatoria",
    }),
    email: z
      .string({
        required_error: "Email obligatorio",
      })
      .email({
        message: "Email invalido",
      }),
    user_id: z.coerce.number({
      message: "ID de usuario debe ser un número",
    }),
    first_name: z
      .string()
      .min(3, {
        message: "Tu nombre debe tener al menos 3 caracteres",
      })
      .max(50, {
        message: "Tu nombre no debe tener más de 50 caracteres",
      })
      .optional(),
    last_name: z
      .string()
      .min(3, {
        message: "Tu apellido debe tener al menos 3 caracteres",
      })
      .max(50, {
        message: "Tu apellido no debe tener más de 50 caracteres",
      })
      .optional(),
  })
  .strict({
    message: "Campo(s) inválido(s)",
  });

export default celebrityCreationSchema;
