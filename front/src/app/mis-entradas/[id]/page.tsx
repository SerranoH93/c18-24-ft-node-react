"use client";

import Profile from "@/components/profile";
import { useFetchHook } from "@/hooks/useFetchHook";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Params {
    params: {
        id: string;
    };
}

export default function App(params: Params) {
    const getUseFetch = useFetchHook();
    const [getItem, setGetItem] = useState([]);
    const { id } = params.params;

    const getEvents = async () => {
        const { data } = await getUseFetch({
            endpoint: `users_events/${id}`,//${user id de la sesión}`,
            method: 'get'
        });

        console.log(data);
        setGetItem(data);
    }
    useEffect(() => {
        getEvents()
    }
        , []);
    //Split de la ubicación
    // let location = getItem.events.location.split('/');
    // const nameLocation = location[0];
    // const Lat = parseFloat(location[1]);
    // const lng = parseFloat(location[2]);
    return (
        <section className="mt-14 mx-6">
            <div className=" flex flex-row items-center justify-between">
                <div>
                    <Link href="/"><Image src="/logo.svg" alt="Logo" width={100} height={41} /></Link>
                </div>
                <div><Profile /> </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold mt-4 font-BeseNeue">Mis entradas</h1>
                <hr />
                {getItem.length > 0 ? <p className="text-gray-400">Aquí se mostraran sus eventos</p> : <p className="text-gray-400">No tienes eventos</p>}
            </div>
            <div>

                {getItem.length > 0 && getItem.map((item: any) => {
                    return (
                        <div key={item.events.uuid}>
                            <hr />
                            <div className="flex flex-row gap-3 my-4">
                                <div>
                                    <Image
                                        className="rounded-xl object-cover w-80 h-[200px]"
                                        src={item.events.event_poster_url}
                                        alt="Evento"
                                        width={320}
                                        height={200} />
                                </div>
                                <div className="mt-[10px]">
                                    <h2 className="text-xl font-bold font-new">{item.events.name}</h2>
                                    <p className="mt-2 font-medium">{item.events.celebrities.celebrity_alias}</p>
                                    <p className="mt-3 text-xs">{item.events.location}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
[
    {

    }
]