import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, editProfile } from '../profileThunk';
import ProfileForm from './ProfileForm';
import PageLoader from '@/shared/ui/PageLoader';
import toast from 'react-hot-toast';

const ProfileContainer = () => {
    const dispatch = useDispatch();
    const { data: profile, loading, error } = useSelector(state => state.profile);

    useEffect(() => {
        if (!profile) {
            dispatch(fetchProfile());
        }
    }, [dispatch, profile]);

    const handleUpdate = async (formData) => {
        const resultAction = await dispatch(updateProfile(formData));
        if (updateProfile.fulfilled.match(resultAction)) {
            toast.success('Profile updated successfully!');
        } else {
            toast.error(resultAction.payload || 'Failed to update profile.');
        }
    };

    if (loading && !profile) return <PageLoader message="Loading Profile..." />;
    if (error) return <div>Error: {error}</div>;
    if (!profile) return null;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
            <ProfileForm user={profile} onSubmit={handleUpdate} />
        </div>
    );
};

export default ProfileContainer;