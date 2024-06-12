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
    console.log(params.params.id);

    const [getItem, setGetItem] = useState([]);
    const useFetch = useFetchHook();
    const { id } = params.params;

    const getMyEvents = async () => {
        const data = await useFetch({
            endpoint: `users_events/${id}`,//${user id de la sesión}`,
            method: 'get'
        });

        console.log(data);
        setGetItem(data);
    }
    useEffect(() => {
        getMyEvents()
    }
        , []);
    return (
        <section className="mt-14 mx-6">
            <div className=" flex flex-row items-center justify-between">
                <div>
                    <Link href="/"><Image src="/logo.svg" alt="Logo" width={100} height={41} /></Link>
                </div>
                <div><Profile /> </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold mt-4">Mis entradas</h1>
                <hr />
                {getItem.length > 0 ? <p className="text-gray-400">Aquí se mostraran sus eventos</p> : <p className="text-gray-400">No tienes eventos</p>}
            </div>
            <div>

                {getItem.length > 0 && getItem.map((item: any) => {
                    return (
                        <div>
                            <hr />
                            <div key={item.events.uuid} className="flex flex-row gap-3 my-4">
                                <div>
                                    <Image
                                        className="rounded-xl object-cover w-40 h-[200px]"
                                        src={item.events.event_poster_url}
                                        alt="Evento"
                                        width={100}
                                        height={100} />
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