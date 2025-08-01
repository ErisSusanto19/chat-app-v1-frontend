import React, { useCallback, useEffect, useRef } from 'react';
import ContactItem from './ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../contactThunk';
import { resetContactList } from '../contactSlice';
import PageLoader from '@/shared/ui/PageLoader';

const ContactList = ({ onContactSelect, selectedId, searchTerm }) => {
  const dispatch = useDispatch();
  const { items: contacts, loading, error, currentPage, totalPages } = useSelector(state => state.contacts);

  const observer = useRef();
  const lastContactElementRef = useCallback(node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && currentPage < totalPages) {
              dispatch(fetchContacts({ page: currentPage + 1, search: searchTerm }));
          }
      });
      if (node) observer.current.observe(node);
  }, [loading, currentPage, totalPages, dispatch, searchTerm]);

  useEffect(() => {
    dispatch(resetContactList()); 
    dispatch(fetchContacts({ page: 1, search: searchTerm }));
  }, [searchTerm, dispatch]);

  if(loading && contacts.length === 0){
    return <PageLoader message="Loading contacts..."/>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Failed to load contacts: {error}</div>;
  }
  
  if (!loading && contacts.length === 0) {
    return <div className="p-4 text-center text-gray-500">No contacts found.</div>;
  }

  return (
    <div className="divide-y divide-gray-200">
        {contacts.map((contact, index) => {
            if (contacts.length === index + 1) {
                return (
                    <div ref={lastContactElementRef} key={contact._id}>
                        <ContactItem 
                            contact={contact} 
                            onSelect={onContactSelect}
                            isSelected={contact._id === selectedId}
                        />
                    </div>
                );
            } else {
                return (
                    <ContactItem 
                        key={contact._id} 
                        contact={contact} 
                        onSelect={onContactSelect}
                        isSelected={contact._id === selectedId}
                    />
                );
            }
        })}
        {loading && contacts.length > 0 && <PageLoader message="Loading more..." small={true}/>}
        {!loading && currentPage >= totalPages && contacts.length > 0 && 
            <div className="p-4 text-center text-sm text-gray-500">No more contacts to load.</div>
        }
    </div>
  );
};

export default ContactList;