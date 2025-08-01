import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, editProfile } from '../profileThunk';
import { resetState } from '../../auth/authSlice'
import Modal from '@/shared/ui/Modal';
import ProfileDetailView from './ProfileDetailView';
import ProfileForm from './ProfileForm';
import PageLoader from '@/shared/ui/PageLoader';
import toast from 'react-hot-toast';
import Button from '@/shared/ui/Button'
import { Edit } from 'lucide-react'
import ConfirmationModal from '@/shared/ui/ConfirmationModal';
import apiClient from '@/services/axiosInstance';

const ProfileModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { data: profile, loading } = useSelector(state => state.profile);
    const [isEditMode, setIsEditMode] = useState(false);

    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    useEffect(() => {
        if (isOpen && !profile) {
            dispatch(fetchProfile());
        }
    }, [isOpen, profile, dispatch]);
    
    const handleUpdate = async (formData) => {
        try {
            let imageUrl = formData.image;

            if (formData.image instanceof File) {
                toast.loading('Preparing image upload...');
                const signatureResponse = await apiClient.get('/cloudinary-signature');
                const { timestamp, signature } = signatureResponse.data;

                const uploadFormData = new FormData();
                uploadFormData.append('file', formData.image);
                uploadFormData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
                uploadFormData.append('timestamp', timestamp);
                uploadFormData.append('signature', signature);
                
                toast.dismiss();
                toast.loading('Uploading image...');

                const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: uploadFormData,
                });

                const uploadResult = await cloudinaryResponse.json();
                if (!cloudinaryResponse.ok) {
                    throw new Error(uploadResult.error.message || 'Image upload failed.');
                }
                
                imageUrl = uploadResult.secure_url;
                toast.dismiss();
            }

            const finalPayload = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                image: imageUrl,
            };

            const resultAction = await dispatch(editProfile(finalPayload));
            
            if (editProfile.fulfilled.match(resultAction)) {
                toast.success('Profile updated successfully!');
                setIsEditMode(false);
            } else {
                toast.error(resultAction.payload || 'Failed to update profile.');
            }

        } catch (error) {
            toast.dismiss();
            console.error("Error during profile update process:", error);
            toast.error(error.message || 'An unexpected error occurred.');
        }
    };

    const handleConfirmLogout = () => {
        dispatch(resetState());
        setIsLogoutConfirmOpen(false);
        onClose();
        navigate('/login');
        toast.success('You have been logged out.');
    };

    const title = isEditMode ? 'Edit Profile' : 'Your Profile';

    const editButton = (
        <Button onClick={() => setIsEditMode(true)} secondary={true} className="p-2">
            <Edit size={16} />
        </Button>
    );

    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                title={title}
                headerActions={!isEditMode && profile ? editButton : null}
            >
                {loading && !profile && <PageLoader />}
                {profile && (
                    <>
                        {isEditMode ? (
                            <ProfileForm user={profile} onSubmit={handleUpdate} onCancel={() => setIsEditMode(false)} />
                        ) : (
                            <ProfileDetailView user={profile} onLogout={() => setIsLogoutConfirmOpen(true)} />
                        )}
                    </>
                )}
            </Modal>

            <ConfirmationModal
                isOpen={isLogoutConfirmOpen}
                onClose={() => setIsLogoutConfirmOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out of your account?"
            />
        </>
    );
};

export default ProfileModal;