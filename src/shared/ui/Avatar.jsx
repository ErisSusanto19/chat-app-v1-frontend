import React from 'react';
import { User } from 'lucide-react';

function Avatar({ src, alt = 'Avatar', size = 'md', isOnline = false }) {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-11 w-11',
        lg: 'h-16 w-16',
    };

    return (
        <div className={`relative inline-block ${sizeClasses[size]}`}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full rounded-full object-cover"
                />
            ) : (
                <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="text-white" size={size === 'sm' ? 16 : 24} />
                </div>
            )}

            {isOnline && (
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
            )}
        </div>
    );
}

export default Avatar;