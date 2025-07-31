import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/shared/ui/Button';
import FileUpload from '@/shared/ui/FileUpload';
import Input from '@/shared/ui/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    phoneNumber: z.string().optional(),
    image: z.any().optional()
});


const ProfileForm = ({ user, onSubmit, onCancel }) => {
    const { 
        register, 
        handleSubmit, 
        setValue,
        watch,
        formState: { errors, isSubmitting } 
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            phoneNumber: user?.phoneNumber || '',
            image: user?.image || null
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center">
                <FileUpload
                    name="image"
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }}
                    circle={true}
                />
            </div>

            <Input
                target="name"
                label="Full Name"
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />

            <Input
                target="phoneNumber"
                label="Phone Number (Optional)"
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />
        
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button type="button" onClick={onCancel} disabled={isSubmitting} secondary={true}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default ProfileForm;