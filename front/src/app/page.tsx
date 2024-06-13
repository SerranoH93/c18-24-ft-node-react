"use client"

import React, { useEffect, useState } from 'react';
import { userAuthStore } from "@/store/userAuthStore";
import Profile from "@/components/profile";
import Link from "next/link";
import CardEvent from "@/components/cardevent";
import { fetchEvents, Event } from "@/hooks/getEventHook";
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import Footer from '@/components/Footer';
import useWindowSize from '@/hooks/WindowSizeHook';


export default function Home() {
  //* Se obtienen del estado global el token y el usuario
  const user = userAuthStore((state) => state.user);
  const token = userAuthStore((state) => state.token);
  console.log('User:', user);


  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    console.log('Searching for:', searchInput);
  };

  //* Inicialización del estado para guardar los eventos
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const eventsData = await fetchEvents('events'); //! Corregir para el endpoint de back
        setEvents(eventsData);
      } catch (error) {
        throw error;
      }
    }
    loadEvents();
  }, [fetchEvents]);

  //*Se usa para mostrar solamente los primeros 5 eventos más próximos
  useEffect(() => {
    const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setUpcomingEvents(sortedEvents.slice(0, 4));
  }, [events]);

  //* Consulta para tamaño de ventana
  const windowSize = useWindowSize();
  const isSmallScreen = windowSize.width !== undefined && windowSize.width > 640;


  //* Maneja el logout --- Se movio al componente profile


  return (
    <main >
      <div className="flex flex-col mt-14 mx-6 sm:mx-20">
      <div className=" flex flex-row items-center justify-between">
        <div>
          <Link href="/"><Image src="/logo.svg" alt="Logo" width={100} height={41} /></Link>
        </div>
        <div>
          {token === null ? 
            <div>
              <Link className='mr-1.5' href="/login">
                <button className="py-2.5 px-7 bg-black text-gray-100 rounded-full" >Iniciar sesión</button>
              </Link> 
              <Link href="/register">
                <button className="py-2.5 px-7 bg-[#363DDA] text-gray-100 rounded-full hidden sm:inline-block" >Registrarse</button>
              </Link>
            </div>  : <Profile />} 
        </div>
      </div>

      <div className="py-5 sm:flex sm:flex-row sm:items-center">
        <div className='sm:justify-start sm:mr-24 sm:w-3/4'>
          <SearchBar
          handleInput={handleInputChange}
          handleButton={handleSearchButtonClick}
          input={searchInput}
        />
        </div>
        <div className=' hidden sm:inline-flex sm:justify-end sm:w-1/4'>
        <Link href={`${user?.role === "follower" ? "/register/registercelebrity" : "/event/new"}`} className="text-2xl py-2 px-12 bg-black text-gray-100 rounded-full">Crear evento</Link>
        </div>
        
      </div>

      <section className="mt-6">
        <div className='flex items-center justify-between pb-2'>
          <h3 className="text-2xl mb-2.5">Próximos eventos</h3>
          <Link href={`${user?.role === "follower" ? "/register/registercelebrity" : "/event/new"}`} className="py-2 px-4 bg-black text-gray-100 rounded-full sm:hidden">Crear evento</Link>
        </div>
        <div className='flex flex-row overflow-x-auto space-x-4 sm:justify-center sm:space-x-12'>
          {upcomingEvents.map(event => (
            <div key={event.id} className='flex-shrink-0'>
              <CardEvent
                uuid={event.uuid}
                title={event.name}
                date={event.date}
                imgUser={event.celebrities.users.avatar_url}
                imgEvent={event.event_poster_url}
                user={event.celebrities.celebrity_alias} 
                size={isSmallScreen ? "medium" : "small"} 
              />
            </div>
          ))}
        </div>

      </section>

      <section className="mt-3.5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h3 className="text-2xl">Destacados</h3>
          <button className="py-2 px-4 bg-black text-gray-100 rounded-full">Ver todos</button>
        </div>

        <div className='flex flex-col items-center justify-between sm:grid sm:grid-cols-2 sm:gap-4 sm:items-center ml-'>
          {events.map(event => (
            <div key={event.id} className='flex-shrink-0 mb-6 sm:w-auto sm:ml-12'>
              <CardEvent

                uuid={event.uuid}
                title={event.name}
                date={event.date}
                imgUser={event.celebrities.users.avatar_url}
                imgEvent={event.event_poster_url}
                user={event.celebrities.celebrity_alias} size={isSmallScreen ? "full" : "medium"} />
            </div>
          ))}
        </div>
      </section>        
      </div>   

      <div className='hidden sm:inline'>
        <Footer/>      
      </div>  
    </main>
  );
}