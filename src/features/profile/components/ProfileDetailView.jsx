import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import { LogOut } from 'lucide-react'
import Button from '@/shared/ui/Button'

const ProfileDetailView = ({ user, onLogout }) => {
    const displayName = user.name || 'No Name';

    return (
        <div className="flex flex-col px-6 py-4">

            <div className="flex flex-col items-center text-center">
                <Avatar 
                    src={user.image}
                    fallbackText={displayName.charAt(0)}
                    size="xl"
                    className="w-48 h-48 text-7xl mb-4 rounded-full overflow-hidden"
                />
                <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                <p className="text-md text-gray-500 mt-1">{user.email}</p>
            </div>

            <div className="my-6 border-t border-gray-200"></div>

            <div className="text-left space-y-6">
                <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-lg text-gray-800">{user.name || '-'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="text-lg text-gray-800">{user.email}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="text-lg text-gray-800">{user.phoneNumber || '-'}</p>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <Button 
                    onClick={onLogout} 
                    danger={true}
                    fullWidth={true}
                >
                    <LogOut size={16} className="mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default ProfileDetailView;