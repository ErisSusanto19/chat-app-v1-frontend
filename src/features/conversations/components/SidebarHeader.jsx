import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import { EllipsisVertical, MessageSquare } from 'lucide-react';

function SidebarHeader() {
    // const { user } = useSelector(state => state.auth);
    return (
        <header className="flex items-center justify-between p-3 bg-gray-200">
            <Avatar src={''/* user.avatarUrl */} />
            <div className="flex gap-4">
                <MessageSquare size={24} className="cursor-pointer" />
                <EllipsisVertical size={24} className="cursor-pointer" />
            </div>
        </header>
    );
}
export default SidebarHeader;