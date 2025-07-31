import Avatar from '@/shared/ui/Avatar';
import clsx from 'clsx';

const ContactItem = ({ contact, onSelect, isSelected }) => {
    const displayName = contact.name || contact.detail?.name;
    const displayImage = contact.detail?.image;

    return (
        <div
            onClick={() => onSelect(contact._id)}
            className={clsx(
                "flex items-center p-4 cursor-pointer transition-colors duration-200",
                isSelected 
                    ? 'bg-amber-100'
                    : 'hover:bg-gray-100'
            )}
        >
            <Avatar 
                src={displayImage} 
                fallbackText={displayName.charAt(0)}
                size="md"
            />
            <div className="ml-4">
                <p className="font-semibold text-gray-800">{displayName}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
            </div>
        </div>
    );
}

export default ContactItem