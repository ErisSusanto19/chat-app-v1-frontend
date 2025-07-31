import React, { useEffect } from 'react';
import ContactItem from './ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../contactThunk';
import PageLoader from '@/shared/ui/PageLoader'

const ContactList = ({ onContactSelect, selectedId }) => {
  const dispatch = useDispatch()
  const {items: contacts, loading, error} = useSelector(state => state.contacts)

  useEffect(() => {
    if(contacts.length == 0){
      dispatch(fetchContacts())
    }
  }, [dispatch])

  if(loading && contacts.length == 0){
    return <PageLoader message="Loading contacts..."/>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Failed to load contacts: {error}</div>;
  }
  
  if (!loading && contacts.length === 0) {
    return <div className="p-4 text-center text-gray-500">No contacts found.</div>
  }

  return (
    <div className="divide-y divide-gray-200">
        {contacts.map(contact => (
          <ContactItem 
            key={contact._id} 
            contact={contact} 
            onSelect={onContactSelect}
            isSelected={contact._id === selectedId}
          />
        ))}
    </div>
  );
}

export default ContactList;