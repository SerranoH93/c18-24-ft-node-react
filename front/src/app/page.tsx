"use client"
  
import React, { useState } from 'react';
import { userAuthStore } from "@/store/userAuthStore";
import Profile from "@/components/profile";
import Link from "next/link";
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const user = userAuthStore((state) => state.user);
  const token = userAuthStore((state) => state.token); 
  const logout = userAuthStore((state) => state.logout);
    
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleSearchButtonClick = () => {
        console.log('Searching for:', searchInput);
    };

  const handleLogout = () => {
    logout();
  }

  return (
    <main className="flex flex-col mt-14 ml-8 mr-8">      
      <div className=" flex flex-row items-center justify-between">
        <div>
          <a href="/"><img src="/logo.svg" alt="" /></a>
        </div>        
        <div>{token===null ? <Link href="/login"><button className="py-2.5 px-7 bg-black text-gray-100 rounded-full" >Iniciar sesión</button></Link> : <Profile/>} </div>
      </div> 

      {/* Search Bar */}
      <div className="p-5">
           
            <SearchBar
                handleInput={handleInputChange}
                handleButton={handleSearchButtonClick}
                input={searchInput}
            />
        </div>
      
      
   

      <div>
        <h3 className="text-2xl">Próximos eventos</h3>
      </div>

      

      <div>
        <h3 className="text-2xl">Destacados</h3>
      </div>

      

      <h1>{user?.first_name}</h1> 

      <button onClick={handleLogout}>Cerrar sesión</button>  
    </main>
  );
}

