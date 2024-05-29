import { z } from 'zod';

const genders = ['male', 'female', 'other'] as const;

export type Genders = (typeof genders)[number];

export const mappedGenders: {[key in Genders]: string} = {
    male: "Hombre",
    female: "Mujer",
    other: "Otro"    
}

export const registerSchema = z.object({
    email: z.string().email({
        message: "Email invalido"
    }),
    name: z.string().min(3, {
        message: "Tu nombre debe tener al menos 3 caracteres"})
        .max(50, {
            message:"No más de 50 caracteres"}),
    lastname: z.string().min(3, {
        message:"Tu apellido debe tener al menos 3 caracteres"})
        .max(50, {
            message:"No más de 50 caracteres"}),
    gender: z.enum(genders, {
        errorMap: () => ({message:'Por favor selecciona un genero'})
    }),
    password: z.string().min(8, {
        message:"La contraseña debe tener al menos 8 caracteres"})
    .max(50, {
        message: 'No más de 50 caracteres'}),
    confirmPassword: z.string().min(8, {message:"La contraseña debe tener al menos 8 caracteres"})
    .max(50, {
        message: 'No más de 50 caracteres'}),
    artistCheck: z.boolean().optional()
}).refine(data => data.password === data.confirmPassword, {
    message: "La contraseña no coincide",
    path: ["confirmPassword"],
});


export const loginSchema = z.object({
    email: z.string().email({
        message: "Email invalido"
    }),
    password: z.string().min(8, {
        message:"La contraseña debe tener al menos 8 caracteres"})
    .max(50, {
        message: 'No más de 50 caracteres'})
})