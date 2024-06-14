"use client"

import { registerSchema, mappedGenders } from '@/validations/userSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchHook } from "@/hooks/useFetchHook";
import { useForm } from "react-hook-form";
import Input from "@/components/input";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';


type Inputs = {
    email: string;
    name: string;
    lastname: string;
    password: string;
    confirmPassword: string;
    gender: string;
    checkbox: boolean;
    artistCheck: boolean;
}


export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema)
    });

    const gendersOptions = Object.entries(mappedGenders).map(([key, value]) => {
        return <option value={key} key={key}>{value}</option>
    })



    const Fetch = useFetchHook()

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
            <div className='text-[#030712]' id="title">
                <Link className='flex flex-col gap-2 mb-4' href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                        <path d="M14.0938 4.59375L7.90625 10.5L14.0938 16.4062" stroke="black" stroke-width="2.0625" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Image src="/logo.svg" alt="Logo" width={100} height={41} />
                </Link>
                <h2 className="text-4xl font-BeseNeue">Bienvenido</h2>
                <p>completa tus datos</p>
                <p>o continua con las redes sociales</p>
            </div>

            <div className="flex justify-center m-5">
                <img className="h-24 w-24" src="/profile.svg" alt="" />
            </div>

            <form onSubmit={onSubmit} className='flex flex-col '>
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
                    icon={<button type="button" onClick={togglePasswordVisibility}>{passwordVisible ? <img src="/visibilityOff.svg" alt="" /> : <img src="/visibilityOn.svg" alt="" />}</button>}
                />
                <Input
                    label="Confirmar contraseña"
                    name='confirmPassword'
                    register={register}
                    placeholder='Repetir contraseña'
                    type={passwordVisible ? 'text' : 'password'}
                    errors={errors}
                    icon={<button type="button" onClick={togglePasswordVisibility}>{passwordVisible ? <img src="/visibilityOff.svg" alt="" /> : <img src="/visibilityOn.svg" alt="" />}</button>}
                />

                <Input
                    name='artistCheck'
                    register={register}
                    placeholder='Soy artista'
                    label="Soy artista y quiero tener mi perfil"
                    type='checkbox'
                    errors={errors}
                />


                <button type='submit' className="h-16 bg-[#030712] text-gray-100 rounded-full mt-7">Registrate</button>
            </form>

            <div className="flex flex-col items-center text-center text-xs my-5">
                <p>Al registrarte aceptas nuestros <a className='font-bold underline' href="#">Términos y condiciones</a> y <a className='font-bold underline' href="#">Políticas de privacidad.</a></p>
            </div>
        </div>
    )
}