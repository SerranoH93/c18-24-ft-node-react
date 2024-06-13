"use client"

import { registerArtistSchema, mappedCategory } from '@/validations/userSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthStore } from '@/store/userAuthStore';
import { useFetchHook } from '@/hooks/useFetchHook';
import { useForm } from "react-hook-form";
import Input from "@/components/input";

type Inputs = {
    user: string;
    name: string;
    lastname: string;
    dni: number;
    date: Date;
    location: string;
    category: string;
    image: object;
}

export default function RegisterEvent() {
    const userID = userAuthStore((state) => state.user);


    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerArtistSchema)
    });

    const categoryOptions = Object.entries(mappedCategory).map(([key, value]) => {
        return <option value={key} key={key}>{value}</option>
    })

    const Fetch = useFetchHook()

    const onSubmit = handleSubmit(async ({ user, name, lastname, dni, date, location, category }) => {
        const formData = new FormData();
        formData.append('user_id', String(userID?.id));
        formData.append('celebrity_alias', user);
        formData.append('first_name', name);
        formData.append('last_name', lastname);
        formData.append('id_number', dni.toString());
        formData.append('birthdate', date.toString());
        formData.append('active_region', location);
        formData.append('category', category);
        const imageFile = watch('image') as FileList;
        if (imageFile && imageFile[0]) {
            formData.append("image", imageFile[0]);
        }

        for (let [key, value] of Array.from(formData.entries())) {
            console.log(`${key}: ${value}`);
        }




        await Fetch({
            endpoint: 'celebrities/create',
            redirectRoute: '/',
            formData: formData,
            method: 'post'
        })
        //Obtener el id del usuario
    })


    return (
        <section className='flex flex-col mt-10 ml-8 mr-8'>
            <h1 className='text-[color:var(--text-color)] text-4xl font-BeseNeue '>Regístrate<br />como artista</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <Input
                    label="Usuario"
                    type="text"
                    name='user'
                    register={register}
                    errors={errors}
                />
                <Input
                    label="Nombre"
                    type="text"
                    name='name'
                    register={register}
                    errors={errors}
                />
                <Input
                    label="Apellido"
                    type="text"
                    name='lastname'
                    register={register}
                    errors={errors}
                />
                <Input
                    label="DNI"
                    type="number"
                    name='dni'
                    register={register}
                    errors={errors}
                />
                <Input
                    label="Fecha de nacimiento"
                    type="date"
                    name='date'
                    register={register}
                    errors={errors}
                />
                <Input
                    label="Ubicación"
                    type="text"
                    name='location'
                    register={register}
                    errors={errors}
                />
                <Input
                    label="Categoria"
                    type="select"
                    name='category'
                    register={register}
                    errors={errors}
                    gendersOptions={categoryOptions}
                />
                <Input
                    label="Imagen"
                    type="file"
                    name='image'
                    register={register}
                    errors={errors}
                />
                <p className='text-xs px-6 text-[#1F2937]'>Ej: Factura de compra, servicios, etc...</p>

                <div className='flex justify-center items-center'>
                    <button className="h-16 w-72 bg-[#030712] text-2xl font-normal text-gray-100 rounded-full mt-7" onClick={onSubmit}>Enviar</button>
                </div>
            </form>
        </section>
    )
}