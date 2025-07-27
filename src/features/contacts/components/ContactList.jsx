import React from 'react';
import ContactItem from './ContactItem';

const dummyContacts = [
    {
        "_id": "6885d0f52b7d20a4a2460244",
        "userId": "6876f7793bc5cb90ccecd8ad",
        "name": "Old man",
        "email": "raiden@mail.com",
        "status": "Registered",
        "detail": {
            "_id": "67b033af573431b6adb960f8",
            "name": "Lord Raiden",
            "email": "raiden@mail.com",
            "image": 'https://i.pravatar.cc/150?u=raiden'
        }
    },
    {
        "_id": "6885d248ca3ed4cc24f7bbbe",
        "userId": "6876f7793bc5cb90ccecd8ad",
        "name": "Blind Guy",
        "email": "kenshi@mail.com",
        "status": "Registered",
        "detail": {
            "_id": "67e650649b29dccaf9326cec",
            "name": "Kenshi",
            "email": "kenshi@mail.com",
            "image": null
        }
    }
];

const ContactList = ({ onContactSelect }) => {
  return (
    <div className="divide-y divide-gray-200">
        {dummyContacts.map(contact => (
          <ContactItem 
            key={contact._id} 
            contact={contact} 
            onSelect={onContactSelect} 
          />
        ))}
    </div>
  );
}

export default ContactList;