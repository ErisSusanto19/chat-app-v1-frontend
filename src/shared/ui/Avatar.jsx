import React from 'react';
import { User } from 'lucide-react';
import clsx from 'clsx';

const Avatar = ({ src, alt = 'Avatar', size = 'md', isOnline = false, className, fallbackText }) => {
    
    const sizeClasses = {
        sm: 'h-8 w-8 text-sm',
        md: 'h-11 w-11 text-lg',
        lg: 'h-16 w-16 text-2xl',
        xl: 'h-48 w-48 text-7xl'
    };

    return (
        <div 
            className={clsx(
                'relative inline-block flex-shrink-0',
                sizeClasses[size],
                className
            )}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full rounded-full object-cover"
                />
            ) : (
                <div className="h-full w-full rounded-full bg-gray-400 flex items-center justify-center font-semibold text-white">
                    {fallbackText ? (
                        <span>{fallbackText}</span>
                    ) : (
                        <User size={size === 'sm' ? 16 : 24} />
                    )}
                </div>
            )}

            {isOnline && (
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
            )}
        </div>
    );
}

export default Avatar;