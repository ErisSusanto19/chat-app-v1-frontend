import React from 'react';
import Modal from '@/shared/ui/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../contactThunk';
import toast from 'react-hot-toast';
import Button from '@/shared/ui/Button'

const contactSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
});


const ContactFormModal = ({ isOpen, onClose, contactToEdit, onSuccess }) => {
    const dispatch = useDispatch()
    const isEditMode = Boolean(contactToEdit);

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        resolver: zodResolver(contactSchema),
        mode: 'onChange',
        defaultValues: {
            name: contactToEdit?.name || '',
            email: contactToEdit?.email || ''
        }
    });

    const onSubmit = async (data) => {
        const isAddMode = !isEditMode;

        const resultAction = isAddMode
            ? await dispatch(addContact(data))
            : await dispatch(editContact({ id: contactToEdit._id, data }));

        const matcher = isAddMode ? addContact : editContact;
        
        if (matcher.fulfilled.match(resultAction)) {
            toast.success(`Contact ${isAddMode ? 'added' : 'updated'} successfully!`);
            
            if (isAddMode && onSuccess) {
                onSuccess();
            }

            onClose();
        } else if (matcher.rejected.match(resultAction)) {
            toast.error(resultAction.payload);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Contact">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" onClick={onClose} disabled={isSubmitting} secondary={true}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                        {isEditMode ? 'Save Changes' : 'Save Contact'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ContactFormModal;