import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative p-3">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={value}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 bg-gray-200 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default SearchBar;