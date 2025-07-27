import Avatar from '@/shared/ui/Avatar';

const ContactItem = ({ contact, onSelect }) => {
    const displayName = contact.detail?.name || contact.name;
    const displayImage = contact.detail?.image;

    console.log(contact, '<<< cek from contact item');
    

    return (
        <div
            onClick={() => onSelect(contact._id)}
            className="flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
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