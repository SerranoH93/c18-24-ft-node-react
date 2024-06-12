// components/Footer.tsx

import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#222223] relative text-white py-[52px] px-[100px] w-full h-[524px] " >
            <div className="max-w-7xl  flex  flex-row justify-between " >
                <div className="w-[600px] " >
                    <h2 className="text-2xl font-semibold mb-4">PREGUNTAS FRECUENTES</h2>
                    <ul className="space-y-1">
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Qué es CIRCLE?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Es gratuita la aplicación?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Cómo me registro en la aplicación?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Puedo editar mi perfil después de registrarme?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Cómo me inscribo a un evento?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Cómo recibiré la ubicación del evento?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Puedo cancelar mi inscripción a un evento?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-700 py-2">
                            <span>¿Qué medidas se toman para proteger mi privacidad?</span>
                            <span className="text-blue-400">&gt;</span>
                        </li>
                    </ul>
                </div>
                <div className=" w-auto flex flex-col items-center justify-start mt-16">
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className=" flex items-center justify-center" >
                            <Image width={224} height={63} src="/appstore.svg" alt="App Store" className="w-full h-full" />
                        </a>
                        <a href="#" className=" flex items-center justify-center" >
                            <Image width={224} height={63} src="/googleplay.svg" alt="Google Play" className="w-full h-full" />
                        </a>
                    </div>                              
  
                </div>
            </div>
            <div className="bg-white right-[154px] bottom-[97px] absolute flex justify-center items-center h-[100px] w-[100px] rounded-full z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
<path d="M19.5 0.75C9.16125 0.75 0.75 9.16125 0.75 19.5V27.2681C0.75 29.1881 2.43187 30.75 4.5 30.75H6.375C6.87228 30.75 7.34919 30.5525 7.70082 30.2008C8.05246 29.8492 8.25 29.3723 8.25 28.875V19.2319C8.25 18.7346 8.05246 18.2577 7.70082 17.906C7.34919 17.5544 6.87228 17.3569 6.375 17.3569H4.6725C5.715 10.1006 11.9588 4.5 19.5 4.5C27.0413 4.5 33.285 10.1006 34.3275 17.3569H32.625C32.1277 17.3569 31.6508 17.5544 31.2992 17.906C30.9475 18.2577 30.75 18.7346 30.75 19.2319V30.75C30.75 32.8181 29.0681 34.5 27 34.5H23.25V32.625H15.75V38.25H27C31.1362 38.25 34.5 34.8862 34.5 30.75C36.5681 30.75 38.25 29.1881 38.25 27.2681V19.5C38.25 9.16125 29.8387 0.75 19.5 0.75Z" fill="#222223"/>
</svg>
                    </div>

                    <div className=" right-0 bottom-0 absolute z-10 opacity-30 ">
                    <Image width={372} height={296} src="/3d-glassy-rope-knot-shape 2.png" alt="3d footer"/>
                    </div>


        </footer>
    );
};

export default Footer;



