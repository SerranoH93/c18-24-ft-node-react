"use client"

import { userAuthStore } from "@/store/userAuthStore";
import Profile from "@/components/profile";
import Link from "next/link";
import CardEvent from "@/components/cardevent";
import { fetchEvents, Event } from "@/hooks/getEventHook";
import { useEffect, useState } from "react";




export default function Home() {
  //* Se obtienen del estado global el token y el usuario
  const user = userAuthStore((state) => state.user);
  const token = userAuthStore((state) => state.token); 
  const logout = userAuthStore((state) => state.logout);

  //* Inicialización del estado para guardar los eventos
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
        try {
            const eventsData = await fetchEvents('event'); //! Corregir para el endpoint de back
            setEvents(eventsData);
        } catch (error) {
          throw error;
        }
    }
    loadEvents();
}, [fetchEvents]);


  //* Maneja el logout
  const handleLogout = () => {
    logout();
  }

  return (
    <main className="flex flex-col mt-14 ml-6 mr-6">      
      <div className=" flex flex-row items-center justify-between">
        <div>
          <a href="/"><img src="/logo.svg" alt="" /></a>
        </div>        
        <div>{token===null ? <Link href="/login"><button className="py-2.5 px-7 bg-black text-gray-100 rounded-full" >Iniciar sesión</button></Link> : <Profile/>} </div>
      </div> 

      <div className="flex flex-col py-2 h-14">
        <img className="py-2.5 h-full" src="/logo.svg" alt="" />
      </div>

      <section className="mt-6">
        <h3 className="text-2xl mb-2.5">Próximos eventos</h3>
        {events.map(event => (
          <CardEvent key={event.id} id={event.id} title={event.name} date={event.date} imgUser={event.imgUser} imgEvent={event.event_poster_url} user={event.user} size="small" />
        ))}
      </section>     

      <section className="mt-3.5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h3 className="text-2xl">Destacados</h3>
          <button className="py-2 px-4 bg-black text-gray-100 rounded-full">Ver todos</button>
        </div>        
        {events.map(event => (
          <CardEvent key={event.id} id={event.id} title={event.name} date={event.date} imgUser={event.imgUser} imgEvent={event.event_poster_url} user={event.user} size="medium" />
        ))}
      </section>

      <div className="flex flex-col items-center mt-6">
        <button className="py-4 px-20 bg-black text-gray-100 rounded-full">Crear evento</button>
      </div>  

      <h1>{user?.first_name}</h1> 

      <button onClick={handleLogout}>Cerrar sesión</button>  
    </main>
  );
}
