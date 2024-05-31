"use client"

import { userAuthStore } from "@/store/userAuthStore";

export default function Home() {
  const user = userAuthStore((state) => state.user);
  const token = userAuthStore((state) => state.token); 
  const logout = userAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Home</h2>
      <h1>{user?.first_name}</h1>      

      <div>{token===null ? <a href="/login">Iniciar Sesion</a> : <img src={user?.avatar_url} alt="" />}</div>

      <button onClick={handleLogout}>Cerrar sesión</button>  

    </main>
  );
}
