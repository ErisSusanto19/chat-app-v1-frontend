import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactById, removeContact } from '../contactThunk';
import { clearCurrentContact } from '../contactSlice';
import ContactDetail from './ContactDetail';
import PageLoader from '@/shared/ui/PageLoader';
import ContactFormModal from './ContactFormModal';
import ConfirmationModal from '@/shared/ui/ConfirmationModal';
import toast from 'react-hot-toast';

const ContactDetailContainer = ({ id, onBack }) => {
    const dispatch = useDispatch();
    const { currentContact, loading, error } = useSelector(state => state.contacts);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchContactById(id));
        }
        return () => {
            dispatch(clearCurrentContact());
        };
    }, [id, dispatch]);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        const resultAction = await dispatch(removeContact(id));
        
        if (removeContact.fulfilled.match(resultAction)) {
            toast.success('Contact deleted successfully.');
            onBack();
        } else {
            toast.error(resultAction.payload || 'Failed to delete contact.');
            setIsDeleteModalOpen(false);
        }
        setIsDeleting(false);
    };

    if (loading && !currentContact) {
        return <PageLoader message="Loading contact details..." />;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    if (currentContact) {
        return (
            <>
                <ContactDetail 
                    contact={currentContact} 
                    onBack={onBack}
                    onEdit={() => setIsEditModalOpen(true)}
                    onDelete={() => setIsDeleteModalOpen(true)}
                />

                <ContactFormModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    contactToEdit={currentContact}
                />

                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Contact"
                    message={`Are you sure you want to permanently delete ${currentContact.name}? This action cannot be undone.`}
                    isLoading={isDeleting}
                />
            </>
        )
    }

    return null; 
};

export default ContactDetailContainer;