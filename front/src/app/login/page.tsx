"use client";

import Input from "@/components/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFetch } from "@/hooks/postHook";

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
    });

    const Fetch = useFetch();

    const onSubmit = handleSubmit(async (data) => {
        await Fetch({
            endpoint: "authentication/login",
            redirectRoute: "/",
            formData: data,
            method: "post",
            options: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        });
    });

    return (
        <div className="flex flex-col mt-10 ml-8 mr-8">
            <div className="text-[color:var(--text-color)]" id="title">
                <h2 className="text-4xl font-BeseNeue pb-6">Bienvenido</h2>
                <p>Inicia sesión con tu correo</p>
                <p>electrónico y contraseña o continúa</p>
                <p>con tus redes sociales</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col mt-[50px]">
                <Input
                    label="Email"
                    name="email"
                    register={register}
                    placeholder="Ingresa tu correo"
                    type="email"
                    errors={errors}
                />

                <Input
                    label="Contraseña"
                    name="password"
                    register={register}
                    placeholder="Ingresa tu contraseña"
                    type={passwordVisible ? "text" : "password"}
                    errors={errors}
                    icon={
                        <button type="button" onClick={togglePasswordVisibility}>
                            {passwordVisible ? (
                                <Image
                                    src="/visibilityOff.svg"
                                    width={24}
                                    height={24}
                                    alt="password visibility"
                                />
                            ) : (
                                <Image
                                    src="/visibilityOn.svg"
                                    width={24}
                                    height={24}
                                    alt="password visibility"
                                />
                            )}
                        </button>
                    }
                />

                <a className="text-right mt-8" href="#">
                    ¿Olvidaste tu contraseña?
                </a>

                <button
                    type="submit"
                    className="mt-2 h-16 bg-[#030712] text-gray-100 rounded-full"
                >
                    Iniciar sesión
                </button>
            </form>

            <div className="flex flex-col items-center mt-9">
                <p className="">o continúa con</p>
                <div className="mt-5">
                    <Image
                        src="/Google.svg"
                        width={37}
                        height={37}
                        alt="google icon"
                    />
                </div>

                <div className="mt-7">
                    <p>
                        ¿No tienes cuenta en CIRCLE?&nbsp;
                        <a className="font-bold underline" href="/register">
                            Registrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
