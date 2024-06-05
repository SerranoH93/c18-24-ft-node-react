// pages/index.tsx

import React, { useState } from 'react';

import SearchBar from '@/components/SearchBar';
const HomePage: React.FC = () => {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleSearchButtonClick = () => {
        console.log('Searching for:', searchInput);
    };

    return (
        <div className="p-5">
           
            <SearchBar
                handleInput={handleInputChange}
                handleButton={handleSearchButtonClick}
                input={searchInput}
            />
        </div>
    );
};

export default HomePage;
