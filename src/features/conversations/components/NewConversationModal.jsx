import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Modal from '@/shared/ui/Modal';
import Button from '@/shared/ui/Button';
import { addConversation, fetchConversations } from '../conversationThunk';
import toast from 'react-hot-toast';
import { getAllContactsForSelect } from '../../contacts/contactApi'
import AsyncSelect from 'react-select/async';

const NewConversationModal = ({ isOpen, onClose, onConversationCreated }) => {
    const dispatch = useDispatch();

    const { loading: conversationLoading } = useSelector(state => state.conversations);

    const [isGroup, setIsGroup] = useState(false);

    const { control, handleSubmit, register, formState: { errors } } = useForm();

    const loadContactOptions = (inputValue, callback) => {
        getAllContactsForSelect(inputValue)
            .then(options => {
                callback(options);
            })
            .catch(error => {
                console.error("Failed to load contacts:", error);
                callback([]);
            });
    };

    const onSubmit = async (data) => {

        const participantsEmails = Array.isArray(data.participants)
            ? data.participants.map(p => p.value)
            : [data.participants.value];

        const payload = {
            isGroup,
            participants: participantsEmails,
            name: data.groupName || '',
            description: data.groupDescription || '',
            image: null
        };
        
        const resultAction = await dispatch(addConversation(payload));
        
        if (addConversation.fulfilled.match(resultAction)) {
            const newConversation = resultAction.payload.data;
            toast.success(resultAction.payload.message || 'Conversation started!');

            await dispatch(fetchConversations());

            if (onConversationCreated) {
                onConversationCreated(newConversation.conversationId);
            } else {
                onClose();
            }
        } else {
            toast.error(resultAction.payload || 'Failed to start conversation.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isGroup ? "Create New Group" : "Start New Chat"}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4">
                    <label>
                        <input type="radio" name="chatType" checked={!isGroup} onChange={() => setIsGroup(false)} /> Private
                    </label>
                    <label>
                        <input type="radio" name="chatType" checked={isGroup} onChange={() => setIsGroup(true)} /> Group
                    </label>
                </div>

                <div>
                    <label>Select Participants</label>
                    <Controller
                        name="participants"
                        control={control}
                        rules={{ required: 'Please select at least one participant.' }}
                        render={({ field }) => (
                            <AsyncSelect
                                {...field}
                                isMulti={isGroup}
                                cacheOptions
                                defaultOptions
                                loadOptions={loadContactOptions}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                placeholder="Type to search for contacts..."
                            />
                        )}
                    />
                    {errors.participants && <p className="text-red-500">{errors.participants.message}</p>}
                </div>

                {isGroup && (
                    <>
                        <div>
                            <label>Group Name</label>
                            <input {...register('groupName', { required: 'Group name is required.' })} className="w-full" />
                            {errors.groupName && <p className="text-red-500">{errors.groupName.message}</p>}
                        </div>
                        <div>
                            <label>Group Description (Optional)</label>
                            <textarea {...register('groupDescription')} className="w-full" />
                        </div>
                    </>
                )}
                
                <div className="flex justify-end pt-4">
                    <Button type="submit" isLoading={conversationLoading}>
                        {isGroup ? "Create Group" : "Start Chat"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewConversationModal;