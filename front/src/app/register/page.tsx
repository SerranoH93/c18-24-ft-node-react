"use client"

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { registerSchema, mappedGenders } from '@/validations/userSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFetch } from "@/hooks/postHook";

type Inputs = {
    email: string;
    name: string;
    lastname: string;
    password: string;
    confirmPassword: string;
    gender: string;
    checkbox: boolean;
}


export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema)
    });

    const gendersOptions = Object.entries(mappedGenders).map(([key, value]) => {
        return <option value={key} key={key}>{value}</option>
    })

    console.log(errors);

    const Fetch = useFetch()

    const onSubmit = handleSubmit(async ({ email, name, lastname, password, gender }) => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("first_name", name);
        formData.append("last_name", lastname);
        formData.append("password", password);
        formData.append("gender", gender)
        for (let [key, value] of Array.from(formData.entries())) {
            console.log(`${key}: ${value}`);
        }




        await Fetch({
            endpoint: 'authentication/register',
            redirectRoute: '/login',
            formData: formData,
            method: 'post'
        })
    })

    return (
        <div className="flex flex-col mt-10 ml-8 mr-8">
            <div className='text-[color:var(--text-color)]' id="title">
                <h2 className="text-4xl">Bienvenido</h2>
                <p>completa tus datos</p>
                <p>o continua con las redes sociales</p>
            </div>

            <div className="flex justify-center m-5">
                <img className="h-24 w-24" src="/profile.svg" alt="" />
            </div>

            <form onSubmit={onSubmit} className='flex flex-col '>
                <Input
                    label="Documento a tu nombre"
                    name='documento'
                    register={register}
                    placeholder='Ingresa tu correo'
                    type='file'
                    errors={errors}
                />
                <Input
                    label="Fecha de nacimiento"
                    name='dob'
                    register={register}
                    placeholder='Ingresa tu correo'
                    type='date'
                    errors={errors}
                />
                <Input
                    label="Email"
                    name='email'
                    register={register}
                    placeholder='Ingresa tu correo'
                    type='email'
                    errors={errors}
                />
                <Input
                    label="Nombres"
                    name='name'
                    register={register}
                    placeholder='Tu nombre'
                    type='text'
                    errors={errors}
                />
                <Input
                    label="Apellidos"
                    name='lastname'
                    register={register}
                    placeholder='Tu apellido'
                    type='text'
                    errors={errors}
                />
                <Input
                    label="Genero"
                    name='gender'
                    register={register}
                    type='select'
                    gendersOptions={gendersOptions}
                    errors={errors}
                />
                <Input
                    label="Contraseña"
                    name='password'
                    register={register}
                    placeholder='Ingresa tu contraseña'
                    type={passwordVisible ? 'text' : 'password'}
                    errors={errors}
                    icon={<button type="button" onClick={togglePasswordVisibility}>{passwordVisible ? <img src="/visibility.svg" alt="" /> : <img src="/visibility.svg" alt="" />}</button>}
                />
                <Input
                    label="Confirmar contraseña"
                    name='confirmPassword'
                    register={register}
                    placeholder='Repetir contraseña'
                    type={passwordVisible ? 'text' : 'password'}
                    errors={errors}
                    icon={<button type="button" onClick={togglePasswordVisibility}>{passwordVisible ? <img src="/visibility.svg" alt="" /> : <img src="/visibility.svg" alt="" />}</button>}
                />

                <Input
                    name='artistCheck'
                    register={register}
                    placeholder='Soy artista'
                    label="Soy artista y quiero tener mi perfil"
                    type='checkbox'
                    errors={errors}
                />


                <button type='submit' className="h-16 bg-black text-gray-100 rounded-full mt-7">Registrate</button>
            </form>

            <div className="flex flex-col items-center mt-5 mb-5">
                <p>Al registrarte aceptas nuestros <a className='font-bold underline' href="#">Términos y condiciones</a> y <a className='font-bold underline' href="#">Políticas de privacidad.</a></p>
            </div>
        </div>
    )
}