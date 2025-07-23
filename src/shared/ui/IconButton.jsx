import React from 'react';
import clsx from 'clsx';

function IconButton({ Icon, onClick, className, title }) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={clsx(
                'flex items-center justify-center rounded-full p-2 text-gray-600 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500',
                className
            )}
        >
            <Icon size={22} />
        </button>
    );
}

export default IconButton;