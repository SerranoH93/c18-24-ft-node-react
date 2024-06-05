import z from "zod";

const eventUpdateSchema = z
  .object({
    name: z
      .string()
      .min(5, {
        message: "El nombre debe tener al menos 5 caracteres",
      })
      .max(50, {
        message: "El nombre no debe tener más de 50 caracteres",
      }),
    about: z
      .string()
      .min(10, {
        message: "La descripción debe tener al menos 10 caracteres",
      })
      .max(500, {
        message: "La descripción no debe tener más de 500 caracteres",
      }),
    date: z.coerce.date().min(new Date(), {
      message: "No se pueden crear eventos en el pasado",
    }),
    price: z.coerce.number().nonnegative({
      message: "El precio no puede ser un número negativo",
    }),
    location: z.string(),
    celebrity_id: z.coerce.number({
      message: "ID de celebridad debe ser un número",
    }),
  })
  .partial();

export default eventUpdateSchema;
