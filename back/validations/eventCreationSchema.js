import z from "zod";

const eventCreationSchema = z
  .object({
    name: z
      .string({
        required_error: "Nombre obligatorio",
      })
      .min(5, {
        message: "El nombre debe tener al menos 5 caracteres",
      })
      .max(50, {
        message: "El nombre no debe tener más de 50 caracteres",
      }),
    date: z.coerce
      .date({
        required_error: "Fecha y hora son obligatorios",
      })
      .min(new Date(), {
        message: "No se pueden crear eventos en el pasado",
      }),
    price: z.coerce
      .number({
        required_error: "Precio obligatorio",
      })
      .nonnegative({
        message: "El precio no puede ser un número negativo",
      }),
    seats: z.coerce
      .number({
        required_error: "Número de asientos obligatorio",
      })
      .positive({
        message: "El número de asientos debe ser mayor a cero",
      }),
    about: z
      .string({
        required_error: "Descripción obligatoria",
      })
      .min(10, {
        message: "La descripción debe tener al menos 10 caracteres",
      })
      .max(500, {
        message: "La descripción no debe tener más de 500 caracteres",
      }),
    location: z.string({
      required_error: "Ubicación obligatoria",
    }),
    celebrity_id: z.coerce.number({
      message: "ID de celebridad debe ser un número",
    }),
  })
  .strict({
    message: "Campo(s) inválido(s)",
  });

export default eventCreationSchema;
