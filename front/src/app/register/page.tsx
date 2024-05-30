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

    const onSubmit = handleSubmit(async ({ email, name, lastname, password, confirmPassword, gender }) => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("lastname", lastname);
        formData.append("password", password);
        formData.append("confirmPasswordd", confirmPassword);
        formData.append("gender", gender)


        await Fetch({
            endpoint: 'registerpet',
            redirectRoute: '/',
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
                <Input name='email' register={register} placeholder='Ingresa tu correo' type='email' errors={errors} />
                <Input name='name' register={register} placeholder='Tu nombre' type='text' errors={errors} />
                <Input name='lastname' register={register} placeholder='Tu apellido' type='text' errors={errors} />
                <Input name='gender' register={register} type='select' gendersOptions={gendersOptions} errors={errors} />
                <Input name='password' register={register} placeholder='Ingresa tu contraseña' type={passwordVisible ? 'text' : 'password'} errors={errors} icon={<button type="button" onClick={togglePasswordVisibility}>{passwordVisible ? <img src="/visibility.svg" alt="" /> : <img src="/visibility.svg" alt="" />}</button>} />
                <Input name='confirmPassword' register={register} placeholder='Repetir contraseña' type={passwordVisible ? 'text' : 'password'} errors={errors} icon={<button type="button" onClick={togglePasswordVisibility}>{passwordVisible ? <img src="/visibility.svg" alt="" /> : <img src="/visibility.svg" alt="" />}</button>} />
                <div className="flex flex-col items-center">
                    <Input name='artistCheck' register={register} placeholder='Soy artista' label="Soy artista y quiero tener mi perfil" type='checkbox' errors={errors} />
                </div>

                <button type='submit' className="h-16 bg-black text-gray-100 rounded-full mt-7">Registrate</button>
            </form>

            <div className="flex flex-col items-center mt-5 mb-5">
                <p>Al registrarte aceptas nuestros <a className='font-bold underline' href="#">Términos y condiciones</a> y <a className='font-bold underline' href="#">Políticas de privacidad.</a></p>
            </div>
        </div>
    )
}