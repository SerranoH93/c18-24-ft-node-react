'use client';

import { GoogleMap, LoadScript, Marker, Autocomplete, LoadScriptNext } from '@react-google-maps/api';
import React, { useState, useEffect, ChangeEvent } from "react";
import { eventCreationSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthStore } from '@/store/userAuthStore';
import { useFetchHook } from '@/hooks/useFetchHook';
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from '@/components/input';
import Image from 'next/image';
import Link from "next/link";


type Inputs = {
    name: string;
    about: string;
    date: string;
    seats: string;
    location: string;
    price: string;
    event_poster_url: string | null;
    celebrity_id: string | null;
}


export default function CreateEvent() {
    const user = userAuthStore((state) => state.user);
    const celebrity = userAuthStore((state) => state.celebrity);

    const [file, setFile] = useState<File | null>(null);
    const [datosCargados, setDatosCargados] = useState(false);
    const [getItem, setGetItem] = useState({
        name: "",
        about: "",
        date: "",
        location: "",
        price: "",
        event_poster_url: "",
        celebrity_id: "",
        avatar_url: ""
    });
    const [selectedAddress, setSelectedAddress] = useState<google.maps.LatLng | null>(null);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const getUseFetch = useFetchHook();
    const params = useParams();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(eventCreationSchema)
    });

    // cargar datos si el params está
    const getTask = async () => {
        const data = await getUseFetch({
            endpoint: `events/retrieve?event_uuid=${params.id[1]}&user_id=${params.id[0]}`,
            method: 'get'
        });

        setGetItem({
            name: data.data.name,
            about: data.data.about,
            date: data.data.date,
            location: data.data.location,
            price: data.data.price,
            event_poster_url: data.data.event_poster_url, // data.data.event_poster_url || null,
            celebrity_id: data.data.celebrity_id,
            avatar_url: data.data.celebrities.users.avatar_url
        });

        setDatosCargados(true);
    };

    useEffect(() => {
        if (params.id) {
            getTask();
        }
    }, []);

    // Hacer el split de la location
    let location = getItem.location.split('/');
    const Lat = parseFloat(location[1]);
    const lng = parseFloat(location[2]);
    //convertir la fecha a iso
    let date = '';
    if (getItem.date) {
        date = getItem.date.substring(0, 16);
    }

    //cargar los datos en los inputs
    useEffect(() => {
        if (params.id) {
            if (datosCargados) {
                setValue('name', getItem.name);
                setValue('about', getItem.about);
                setValue('date', date);
                setValue('location', location[0]);
                setValue('price', String(getItem.price));
                setValue('event_poster_url', getItem.event_poster_url);
                setValue('celebrity_id', getItem.celebrity_id);
            }
        }
    }, [getItem]);

    const onSubmit = handleSubmit(async ({ name, about, date, location, price, seats }) => {

        const formData = new FormData();
        formData.append("name", name);
        formData.append("about", about);
        formData.append("date", date);
        formData.append("seats", seats);
        formData.append("location", `${location}/${String(selectedAddress?.lat())}/${String(selectedAddress?.lng())}`);
        formData.append("price", price);
        //se obtiene desde el estado o desde getItem
        formData.append(
            "celebrity_id",
            params.id ? String(getItem.celebrity_id) : String(celebrity?.id)
        );
        if (file) {
            formData.append('image', file);
        }

        if (params.id) {
            await getUseFetch({
                endpoint: `events/${params.id}`,
                method: 'put',
                redirectRoute: `/event/detail/${params.id}`,
                formData: formData,
                options: {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            });
        } else {
            await getUseFetch({
                endpoint: 'events/create',
                redirectRoute: '/',
                formData: formData,
                options: {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            });
        }
    });

    if (params.id && !datosCargados) {
        return <div className="flex justify-center items-center w-full h-auto min-h-[calc(100vh-16px)]">cargando...</div>;
    }

    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const location = place.geometry.location;
                setSelectedAddress(location);
                setValue('location', place.formatted_address || '');
            }
        }
    };

    console.log(watch());


    return (
        <section className="flex flex-col pb-10">
            <form onSubmit={onSubmit}>
                <figure className="relative flex justify-center items-center w-full h-72 shadow-md">
                    <div className="absolute flex justify-between px-4 w-full top-2 z-30">
                        <Link className="rounded-lg px-4 py-2" href="/">
                            <svg className="stroke-zinc-500" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M14.0938 4.8125L7.90625 11L14.0938 17.1875" strokeOpacity="0.7" strokeWidth="2.0625" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link className="rounded-lg px-4 py-2" href="#">
                            <svg className="stroke-zinc-500" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M11.0002 4.58341V12.3751M13.7502 6.41675L11.0002 3.66675L8.25016 6.41675M4.5835 11.0001V15.5834C4.5835 16.0696 4.77665 16.536 5.12047 16.8798C5.46428 17.2236 5.9306 17.4167 6.41683 17.4167H15.5835C16.0697 17.4167 16.536 17.2236 16.8799 16.8798C17.2237 16.536 17.4168 16.0696 17.4168 15.5834V11.0001" strokeOpacity="0.7" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                    <input className="absolute form-file__input custom-file-input w-full h-full text-transparent" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }} />
                    <Image className="object-cover w-full h-72" src={file ? URL.createObjectURL(file) : getItem.event_poster_url === "" ? "/logo.svg" : getItem.event_poster_url} alt="Imagen de cabecera" width={400} height={400} />
                </figure>
                <div className="flex justify-center items-center gap-8">
                    <figure className="w-28">
                        <Image
                            className="absolute w-[75xp] h-[75px] top-64 left-8 rounded-full border-[4px] border-white z-20"
                            src={user ? user.avatar_url : '/Ellipse4.png'}
                            alt="User image"
                            height={75}
                            width={75}
                        />
                    </figure>
                    <div className="w-full pt-[11px] pb-[6px] px-3 text-left z-20">
                        <textarea
                            className="text-4xl font-new font-extrabold w-full"
                            id="name"
                            required
                            {...register('name')}
                        />
                    </div>
                </div>
                <div className="px-8">
                    <Input
                        type="datetime-local"
                        name="date"
                        label=""
                        placeholder="Fecha"
                        errors={errors}
                        register={register}
                    />
                </div>
                <div className="px-8">
                    <Input
                        type="number"
                        name="seats"
                        label="Límite de inscripciones"
                        placeholder='0'
                        errors={errors}
                        register={register}
                    />
                </div>
                <div className="flex justify-center items-center gap-2 px-8 mt-[22px]">
                    <Input
                        type="number"
                        name="price"
                        label=""
                        errors={errors}
                        register={register}
                        className="rounded-full h-12 px-6 w-full placeholder-zinc-700 outline-none ring-2 ring-zinc-400 border-transparent text-zinc-400 text-xl font-bold"
                        startIcon={<p className="text-xl font-bold text-zinc-400">$</p>}
                    />
                    <button
                        className="rounded-[30px] bg-[#030712] h-12 mt-2 w-full text-white font-new text-2xl font-medium"
                        onClick={() => setValue('price', "0")}>
                        Gratis
                    </button>
                </div>
                <div className="px-8 pt-4">
                    <h2 className="text-xl font-new pb-[11px] pl-[9px]">Acerca del evento</h2>
                    <textarea
                        className="rounded-3xl w-full bg-[#D9D9D9] p-[18px] text-pretty text-sm font-new text-[#383838] focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                        id="about"
                        {...register('about')}
                    />
                </div>
                <div className="px-8 pt-4">
                    <h2 className="text-xl font-new pb-[11px] pl-[9px]">Ubicación aproximada</h2>
                    <figure className="rounded-3xl bg-[#030712] text-pretty text-sm font-new overflow-hidden">
                        <div className="relative h-[240px] w-full">
                            <LoadScriptNext
                                googleMapsApiKey="AIzaSyAcyybGF_nvmxoVvN4V3BZ6meekjSrTpxE"
                                loadingElement={<p>Cargando Mapa...</p>}
                                id="google-maps-script"
                                libraries={['places']}
                            >
                                <div className="rounded-3xl overflow-hidden w-full h-full ">
                                    <GoogleMap
                                        mapContainerStyle={{ height: "200px", width: "100%" }}
                                        center={selectedAddress ? { lat: selectedAddress.lat(), lng: selectedAddress.lng() } : { lat: parseFloat(params.id ? Lat.toString() : "-34.604709378425106"), lng: parseFloat(params.id ? lng.toString() : "-58.43768161222354") }}
                                        zoom={13}
                                        options={{
                                            disableDefaultUI: true, // Desactiva todos los controles predeterminados del mapa
                                            styles: [
                                                {
                                                    featureType: "water",
                                                    elementType: "geometry",
                                                    stylers: [
                                                        { color: "#193341" }
                                                    ]
                                                },
                                                {
                                                    featureType: "landscape",
                                                    elementType: "geometry",
                                                    stylers: [
                                                        { color: "#09090b" }
                                                    ]
                                                },
                                                {
                                                    featureType: "road",
                                                    elementType: "geometry",
                                                    stylers: [
                                                        { color: "#27272a" } // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                                                    ]
                                                },
                                                {
                                                    featureType: "poi",
                                                    stylers: [
                                                        { visibility: "off" } // Oculta puntos de interés como tiendas, restaurantes, etc.
                                                    ]
                                                },
                                                {
                                                    featureType: "transit",
                                                    elementType: "labels.icon",
                                                    stylers: [
                                                        { visibility: "off" } // Oculta iconos de transporte público
                                                    ]
                                                },
                                                {
                                                    featureType: "road",
                                                    elementType: "labels.icon",
                                                    stylers: [
                                                        { visibility: "off" } // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                                                    ]
                                                },
                                                {
                                                    featureType: "administrative",
                                                    elementType: "labels.text.fill",
                                                    stylers: [
                                                        { color: "#ffffff" } // Cambia el color del texto administrativo (por ejemplo, el nombre de las ciudades)
                                                    ]
                                                },
                                                {
                                                    featureType: "administrative.locality",
                                                    elementType: "labels.text.fill",
                                                    stylers: [
                                                        { visibility: "off" } // Oculta el nombre de las localidades (ciudades, pueblos, etc.)
                                                    ]
                                                },
                                                {
                                                    featureType: "administrative.neighborhood",
                                                    elementType: "labels.text.fill",
                                                    stylers: [
                                                        { visibility: "off" } // Oculta el nombre de los barrios
                                                    ]
                                                },
                                                {
                                                    featureType: "road",
                                                    elementType: "labels.text.fill",
                                                    stylers: [
                                                        { visibility: "off" } // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                                                    ]
                                                },
                                            ]
                                        }}
                                    >
                                        {selectedAddress && (
                                            <Marker
                                                position={{
                                                    lat: selectedAddress.lat(),
                                                    lng: selectedAddress.lng()
                                                }}
                                            />
                                        )}
                                    </GoogleMap>
                                    <figcaption className="px-4 py-[10px] text-white font-new text-sm absolute bottom-0 left-0 w-full">
                                        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                            <input
                                                type="text"
                                                placeholder="Ingresa una dirección"
                                                className="w-full bg-transparent text-white border-none outline-none"
                                                {...register('location')}
                                            />
                                        </Autocomplete>
                                    </figcaption>
                                </div>
                            </LoadScriptNext>
                        </div>
                    </figure>
                </div>
                <div className="flex justify-center items-center w-full py-9">
                    <button
                        type="submit"
                        className="rounded-[25px] bg-[#030712] h-[60px] w-72 text-white font-new text-2xl font-normal"
                    >
                        {params.id ? 'Editar evento' : 'Crear evento'}
                    </button>
                </div>
            </form>
        </section>
    );
}