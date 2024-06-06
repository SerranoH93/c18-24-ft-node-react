import { z } from "zod";

const genders = ["male", "female", "other"] as const;

export type Genders = (typeof genders)[number];

export const mappedGenders: { [key in Genders]: string } = {
    male: "Hombre",
    female: "Mujer",
    other: "Otro",
};

const category = [
    "influencer",
    "artista",
    "cantante",
    "comediante",
    "otro",
] as const;

export type Category = (typeof category)[number];

export const mappedCategory: { [key in Category]: string } = {
    influencer: "Influencer",
    artista: "Artista",
    cantante: "Cantante",
    comediante: "Comediante",
    otro: "Otro",
};

const isFileListDefined = typeof FileList !== "undefined";

const imageSchema = isFileListDefined
    ? z
          .instanceof(FileList)
          .refine((files) => files.length > 0, {
              message: "Debe seleccionar un archivo de imagen.",
          })
          .refine(
              (files) => {
                  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
                  return validTypes.includes(files[0]?.type);
              },
              {
                  message:
                      "Formato de imagen no válido. Solo se permiten JPEG, PNG y JPG.",
              }
          )
          .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
              message: "El tamaño de la imagen no debe exceder los 5MB.",
          })
    : z.any();

export const registerSchema = z
    .object({
        email: z.string().email({
            message: "Email invalido",
        }),
        name: z
            .string()
            .min(3, {
                message: "Tu nombre debe tener al menos 3 caracteres",
            })
            .max(50, {
                message: "No más de 50 caracteres",
            }),
        lastname: z
            .string()
            .min(3, {
                message: "Tu apellido debe tener al menos 3 caracteres",
            })
            .max(50, {
                message: "No más de 50 caracteres",
            }),
        gender: z.enum(genders, {
            errorMap: () => ({ message: "Por favor selecciona un genero" }),
        }),
        password: z
            .string()
            .min(8, {
                message: "La contraseña debe tener al menos 8 caracteres",
            })
            .max(50, {
                message: "No más de 50 caracteres",
            }),
        confirmPassword: z
            .string()
            .min(8, {
                message: "La contraseña debe tener al menos 8 caracteres",
            })
            .max(50, {
                message: "No más de 50 caracteres",
            }),
        artistCheck: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "La contraseña no coincide",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email invalido",
    }),
    password: z
        .string()
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        })
        .max(50, {
            message: "No más de 50 caracteres",
        }),
});

export const registerArtistSchema = z.object({
    user: z
        .string()
        .min(3, {
            message: "Tu nombre debe tener al menos 3 caracteres",
        })
        .max(50, {
            message: "No más de 50 caracteres",
        }),
    name: z
        .string()
        .min(3, {
            message: "Tu nombre debe tener al menos 3 caracteres",
        })
        .max(50, {
            message: "No más de 50 caracteres",
        }),
    lastname: z
        .string()
        .min(3, {
            message: "Tu apellido debe tener al menos 3 caracteres",
        })
        .max(50, {
            message: "No más de 50 caracteres",
        }),
    dni: z.string().min(8, {
        message: "Tu dni debe tener al menos 8 caracteres",
    }),
    date: z.string({ required_error: "Fecha de nacimiento obligatoria" }),
    location: z
        .string()
        .min(3, {
            message: "Tu ubicación debe tener al menos 3 caracteres",
        })
        .max(50, {
            message: "No más de 50 caracteres",
        }),
    category: z.enum(category, {
        errorMap: () => ({ message: "Por favor selecciona una categoria" }),
    }),
    image: imageSchema,
});

export const eventCreationSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre debe tener al menos 3 caracteres",
    }),
    about: z.string().min(3, {
        message: "La descripción debe tener al menos 3 caracteres",
    }),
    date: z.string().min(3, {
        message: "La fecha debe tener al menos 3 caracteres",
    }),
    location: z
        .string()
        .min(3, {
            message: "La ubicación debe tener al menos 3 caracteres",
        })
        .optional(),
    price: z.string().optional(),
    celebrity_id: z.string().optional(),
});
