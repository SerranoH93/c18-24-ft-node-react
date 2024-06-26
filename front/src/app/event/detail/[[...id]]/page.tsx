"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Link from "next/link";
import { userAuthStore } from "@/store/userAuthStore";
import { useFetchHook } from "@/hooks/useFetchHook";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { get } from "http";

interface Params {
    id: string[];
}
interface User {
    users: {
        first_name: string;
        last_name: string;
        avatar_url: string;
    }
}
export default function App({ params }: { params: Params }) {
    const user = userAuthStore((state) => state.user);
    const id = params.id[0]
    const uuid = params.id[1]
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [datosCargados, setDatosCargados] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [getItem, setGetItem] = useState({
        name: "",
        about: "",
        date: "",
        seats: "",
        location: "",
        price: "",
        event_poster_url: "",
        avatar_url: "",
        uuid: "",
        users: [],
        isUserRegistered: '',
        celebrities_id: '',
        closed: ''
    });
    console.log("Datos extraídos:", getItem);

    const getUseFetch = useFetchHook()
    //Carga de datos
    const getTask = async () => {
        const res = await getUseFetch({
            endpoint: `events/retrieve?event_uuid=${uuid}&user_id=${id}`,//${user id de la sesion}`,
            method: 'get'
        });

        console.log(res);

        setGetItem({
            name: res.data.name,
            about: res.data.about,
            date: res.data.date,
            seats: res.data.seats,
            location: res.data.location,
            price: String(res.data.price),
            event_poster_url: res.data.event_poster_url, // data.data.event_poster_url || null,
            avatar_url: res.data.celebrities.users.avatar_url,
            uuid: res.data.uuid,
            users: res.data.users,
            isUserRegistered: String(res.data.isUserRegistered),
            celebrities_id: String(res.data.celebrities.users.id),
            closed: String(res.data.closed)
        });
        setDatosCargados(true);
    }
    useEffect(() => {
        if (uuid) {
            getTask();
        }
    }, []);
    useEffect(() => {
        if (!scriptLoaded) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}&callback=initMap`;
            script.async = true;
            document.body.appendChild(script);
            setScriptLoaded(true);
        }
    }, [scriptLoaded]);
    //Split de la ubicación
    let location = getItem.location.split('/');
    const nameLocation = location[0];
    const Lat = parseFloat(location[1]);
    const lng = parseFloat(location[2]);
    //conversion de la fecha
    const date = getItem.date.substring(0, 10);

    const foundBlog = getItem.uuid === uuid;
    if (!foundBlog && !datosCargados) {
        return (
            <section className="flex flex-col justify-center items-center h-screen w-full mt-14 px-2">
                <div className="jelly-triangle">
                    <div className="jelly-triangle__dot"></div>
                    <div className="jelly-triangle__traveler"></div>
                </div>

                <svg width="0" height="0" className="jelly-maker">
                    <defs>
                        <filter id="uib-jelly-triangle-ooze">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="7.3" result="blur"></feGaussianBlur>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="ooze"></feColorMatrix>
                            <feBlend in="SourceGraphic" in2="ooze"></feBlend>
                        </filter>
                    </defs>
                </svg>
            </section>
        );
    }
    if (!foundBlog) {
        return (
            <section className="flex flex-col justify-center items-center h-screen w-full mt-14 px-2">
                <h1
                    className={
                        "text-6xl font-bold bg-gradient-to-br from-zinc-600 via-zinc-400 to-zinc-700 bg-clip-text text-transparent"
                    }
                >
                    ERROR 404
                </h1>
                <h2 className=" py-8 text-xl font-semibold text-center text-zinc-400">
                    Evento no encontrado, vuelve a menu o intenta recargar la página.
                </h2>
            </section>
        );
    }
    const setRegister = async () => {
        await getUseFetch({
            endpoint: `users_events/register`,
            formData: {
                user_id: id,
                event_uuid: uuid,
            },
            method: 'post',
            options: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        });
        getTask();
    }
    const setClose = async () => {
        await getUseFetch({
            endpoint: `events/close/${uuid}`,
            method: 'get',

        });
        getTask();
    }
    const renderMapInfo = ((getItem.celebrities_id === id) || (getItem.closed === "true" && getItem.isUserRegistered === "true"))

    return (
        <section className="flex flex-col pb-10">
            <figure className="relative flex justify-center items-center w-full h-72 shadow-md">
                <div className="absolute flex justify-between px-4 w-full top-2 z-30">
                    <Link className="rounded-lg px-4 py-2" href="/">
                        <svg className="stroke-zinc-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M14.0938 4.8125L7.90625 11L14.0938 17.1875" strokeOpacity="0.7" strokeWidth="2.0625" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <Link className="rounded-lg px-4 py-2" href="#">
                        <svg className="stroke-zinc-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M11.0002 4.58341V12.3751M13.7502 6.41675L11.0002 3.66675L8.25016 6.41675M4.5835 11.0001V15.5834C4.5835 16.0696 4.77665 16.536 5.12047 16.8798C5.46428 17.2236 5.9306 17.4167 6.41683 17.4167H15.5835C16.0697 17.4167 16.536 17.2236 16.8799 16.8798C17.2237 16.536 17.4168 16.0696 17.4168 15.5834V11.0001" strokeOpacity="0.7" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
                <Image className="object-cover w-full h-72" src={getItem.event_poster_url} alt="Imagen de cabecera" width={400} height={400} />
            </figure>
            <div className="flex justify-center items-center gap-8">
                <figure className="w-28">
                    <Image
                        className="absolute w-[75xp] h-[75px] top-64 left-8 rounded-full border-[4px] border-white z-20"
                        src={getItem.avatar_url}
                        alt="User image"
                        height={75}
                        width={75}
                    />
                </figure>
                <div className="w-full pt-[11px] pb-[6px] px-3 text-left z-20">
                    <p className="text-xs font-new font-bold">{date}</p>
                    <div className="flex items-center">
                        <h1 className="text-4xl font-new font-extrabold">{getItem.name}</h1>
                        {user?.role !== "follower" && <Link href={`/event/edit/${user?.id}/${getItem.uuid}`} className="pb-1 pl-2">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" d="M12.1618 5.08259C12.3748 4.86955 12.5438 4.61664 12.659 4.33831C12.7743 4.05998 12.8336 3.76167 12.8336 3.46042C12.8335 3.15917 12.7742 2.86087 12.6589 2.58256C12.5436 2.30425 12.3746 2.05138 12.1615 1.83838C11.9485 1.62538 11.6956 1.45643 11.4173 1.34117C11.1389 1.22591 10.8406 1.1666 10.5394 1.16663C9.93096 1.16668 9.34749 1.40842 8.91732 1.83867L8.3999 2.35609L8.42207 2.42084C8.67722 3.15048 9.09468 3.81267 9.64299 4.3575C10.204 4.92192 10.8892 5.3474 11.6438 5.6L12.1618 5.08259Z" fill="black" />
                                <path d="M8.4227 2.33334L8.39995 2.35551L8.42212 2.42084C8.67727 3.15048 9.09473 3.81268 9.64304 4.35751C10.204 4.92194 10.8892 5.34743 11.6439 5.60001L6.65054 10.5933C6.31337 10.9299 6.14479 11.0985 5.95929 11.2432C5.74035 11.4138 5.50348 11.5601 5.25287 11.6795C5.04054 11.781 4.81479 11.8563 4.3627 12.0068L1.98095 12.8007C1.87196 12.8372 1.75496 12.8426 1.64307 12.8163C1.53118 12.79 1.42883 12.733 1.34753 12.6517C1.26622 12.5705 1.20917 12.4682 1.18278 12.3563C1.15639 12.2445 1.1617 12.1274 1.19812 12.0184L1.99262 9.63609C2.14312 9.18459 2.21837 8.95884 2.31929 8.74651C2.43887 8.49568 2.58529 8.25884 2.7562 8.03951C2.90087 7.85401 3.06945 7.68601 3.40604 7.34943L8.4227 2.33334Z" fill="black" />
                            </svg>
                        </Link>}
                    </div>
                </div>
            </div>
            <div onClick={onOpen} className="flex flex-col justify-center items-center gap-2 w-44 h-16 py-1.5 px-5 rounded-3xl bg-[#030712] ml-8 mt-4">
                <div className="h-8">
                    {
                        getItem.users.length > 0 ?
                            <AvatarGroup
                                classNames={{
                                    count: "bg-[#D9D9D9] border-2 border-[#030712]",
                                }}
                                total={getItem.users.length}
                                size="sm"
                            >
                                {
                                    getItem.users.map((user: User) => {
                                        return (
                                            <Avatar classNames={{
                                                base: "border-2 border-[#030712]",
                                            }} src={user.users.avatar_url} />
                                        )
                                    })
                                }
                            </AvatarGroup> : <p className="text-xs pt-4 text-zinc-500">Aun no hay inscripciones</p>
                    }
                </div>
                <div className="flex w-full justify-between">
                    <p className="text-xs text-white font-new">Inscriptos</p>
                    <p className="text-xs text-white font-semibold font-new">{`${getItem.users.length}/${getItem.seats}`}</p>
                </div>
            </div>
            <div className="px-8 pt-4">
                <h2 className="text-xl font-new pb-[11px] pl-[9px]">Acerca del evento</h2>
                <div className="rounded-3xl bg-[#D9D9D9] p-[18px] text-pretty text-sm font-new text-[#383838]">
                    <p>
                        {getItem.about}
                    </p>
                </div>
            </div>
            <div className="flex justify-center gap-4 items-center w-full px-8 py-5">

                <button className="rounded-full h-12 w-full px-6  outline-none ring-2 ring-[#030712] border-transparent text-[#030712] text-lg font-bold">
                    {getItem.price === "0" ? "Entrada gratuita" : `Entrada $${getItem.price}`}
                </button>
            </div>
            <div className="px-8 pt-4">
                <h2 className="text-xl font-new pb-[11px] pl-[9px]">Ubicación aproximada</h2>
                <div className="rounded-3xl bg-[#030712] text-pretty text-sm font-new overflow-hidden">
                    <div className="relative h-[260px] w-full">
                        {window.google && window.google.maps && (
                            <div className="rounded-3xl overflow-hidden w-full h-full ">
                                <GoogleMap
                                    mapContainerStyle={{ height: `${renderMapInfo ? "200px" : "260px"}`, width: "100%" }}
                                    center={{ lat: Lat, lng: lng }}
                                    zoom={13}
                                    options={{
                                        disableDefaultUI: true, // Desactiva todos los controles predeterminados del mapa
                                        draggable: false, // Cambia el cursor del mapa
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

                                    <Marker
                                        position={{
                                            lat: Lat,
                                            lng: lng
                                        }}
                                        options={
                                            getItem.closed === "true" && getItem.isUserRegistered === "true" ? {} :
                                                {
                                                    icon: {
                                                        url: "/Ellipse12.png",
                                                        scaledSize: new window.google.maps.Size(200, 200),
                                                        anchor: new window.google.maps.Point(100, 100)
                                                    }
                                                }
                                        }
                                    />

                                </GoogleMap>
                            </div>
                        )}

                        {renderMapInfo && <div className="px-4 py-[10px] text-white font-new text-sm absolute bottom-0 left-0 w-full">
                            {nameLocation}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-full py-9">
                {
                    getItem.celebrities_id === id ?
                        (
                            <div className="flex w-full justify-between items-center px-12">
                                <button className="rounded-[25px] bg-[#4E4E4E] h-[37px] w-40 px-4 text-white font-new text-xs font-normal">
                                    Eliminar
                                    evento
                                </button>
                                {
                                    getItem.closed === "true" ? (
                                        <button className="rounded-[25px] bg-[#030712] h-[37px] w-40 px-4 text-white font-new text-xs font-normal">
                                            Evento cerrado
                                        </button>
                                    ) : (
                                        <button onClick={setClose} className="rounded-[25px] bg-[#363DDA] h-[37px] w-40 px-4 text-white font-new text-xs font-normal">
                                            Cerrar
                                            evento
                                        </button>
                                    )
                                }
                            </div>
                        ) : getItem.closed === "true" ?
                            (
                                <button className="rounded-[25px] bg-[#030712] h-[60px] w-72 text-white font-new text-2xl font-normal">
                                    Evento cerrado
                                </button>
                            )
                            : getItem.isUserRegistered === "true" ?
                                (
                                    <button className="rounded-[25px] bg-[#030712] h-[60px] w-72 text-white font-new text-2xl font-normal">
                                        Inscripto
                                    </button>
                                ) :
                                (
                                    <button onClick={setRegister} className="rounded-[25px] bg-[#030712] h-[60px] w-72 text-white font-new text-2xl font-normal">
                                        Inscribirse
                                    </button>
                                )

                }
            </div>
            <div className="pt-4">
                <h2 className="text-xl font-new pb-[11px] pl-[41px]">Comentarios</h2>
                <div className="flex justify-start items-center h-20 px-8 gap-4">
                    <figure className="flex flex-none justify-start h-full w-[45xp]">
                        <Image
                            className="w-[45xp] h-[45px] rounded-full border-2 border-zinc-300"
                            src="/Ellipse4.png"
                            alt="User image"
                            height={45}
                            width={45}
                        />
                    </figure>
                    <div className="flex flex-col justify-between h-full w-full p-[6px]">
                        <div>
                            <p className="text-black text-xs font-new">Excelente organización y ambiente, ¡me encantó cada momento!</p>
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-[#030712] rounded-xl h-5 px-2 py-0.5 text-xs text-white font-new font-bold uppercase">Responder</button>
                            <button className="flex justify-center items-center bg-[#030712] rounded-xl h-5 w-5 mr-5">
                                <svg
                                    className="hover:scale-125 transition-[transform_fill] ease-in-out fill-[#F2F2F2]"
                                    xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <g id="ic:round-favorite">
                                        <path id="Vector" d="M7.23139 10.9037C6.81973 11.2775 6.18598 11.2775 5.77431 10.8983L5.71473 10.8442C2.87098 8.27124 1.01306 6.58665 1.08348 4.48499C1.11598 3.56415 1.58723 2.68124 2.35098 2.16124C3.78098 1.18624 5.54681 1.64124 6.50014 2.75707C7.45348 1.64124 9.21931 1.18082 10.6493 2.16124C11.4131 2.68124 11.8843 3.56415 11.9168 4.48499C11.9926 6.58665 10.1293 8.27124 7.28556 10.855L7.23139 10.9037Z" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                placement="center"
                className="mx-4"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                {
                                    getItem.users.length > 0 ?
                                        getItem.users.map((user: User) => {
                                            return (
                                                <div className="flex gap-4 items-center">
                                                    <Avatar classNames={{
                                                        base: "border-2 border-[#030712]",
                                                    }} src={user.users.avatar_url} />
                                                    <p>{user.users.first_name}&nbsp;{user.users.last_name}</p>
                                                </div>
                                            )
                                        }) : <p className="text-xl text-center text-zinc-500">Aun no hay inscripciones</p>
                                }
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}