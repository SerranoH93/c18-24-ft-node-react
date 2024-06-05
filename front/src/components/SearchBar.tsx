// components/SearchBar.tsx

import React from 'react';

interface SearchBarProps {
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleButton: () => void;
    input: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleInput, handleButton, input }) => {
    return (
        <div className="flex items-center bg-gray-300 rounded-full px-4 py-2">
            <input 
                className="flex-grow bg-transparent border-none p-2 text-lg rounded-full outline-none"
                type='text'
                name='search'
                id='search'
                onChange={handleInput}
                value={input}
                placeholder='Busca eventos o perfiles de usuarios'/>
            <button className="bg-black rounded-full p-2 ml-2 flex items-center justify-center" onClick={handleButton}>
                <img src="/search-icon.svg" alt="Search" className="w-5 h-5" />
            </button>
        </div>        
    );
};

export default SearchBar;

