import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns'
import { Clock, AlertCircle, Trash2, Edit, MoreVertical, X, Check } from 'lucide-react';
import DropdownMenu, { DropdownMenuItem } from '@/shared/ui/DropdownMenu';

const MessageBubble = ({ message, isOwnMessage, onDeleteForMe, onEdit, onDeleteForAll }) => {

    const [isHovering, setIsHovering] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(message.content.message);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            textareaRef.current?.focus();
            textareaRef.current?.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editText.trim() && editText !== message.content.message) {
            onEdit(message._id, editText);
        }
        setIsEditing(false);
    };
    
    const bubbleClasses = clsx(
        'rounded-xl px-4 py-2 max-w-sm md:max-w-md relative',
        isOwnMessage 
            ? 'bg-amber-500 text-white'
            : 'bg-white text-gray-800 shadow-sm'
    );

    const containerClasses = clsx(
        'flex items-start mb-1 gap-2',
        isOwnMessage? 'justify-end' : 'justify-start'
    );

    const messageText = message.content?.message || '';
    const timestamp = message.createdAt;

    let displayTime = '';
    if (timestamp) {
        displayTime = format(new Date(timestamp), 'p');
    }

    const canPerformActions = isOwnMessage && message.content?.type !== 'notification';

    const now = new Date();
    const messageDate = new Date(message.createdAt);
    const timeDifference = now - messageDate;
    const fifteenMinutesInMs = 15 * 60 * 1000;

    const isWithinTimeLimit = timeDifference < fifteenMinutesInMs;

    return (
        <div 
            className={containerClasses}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {isEditing ? (
                <div className="flex-1 flex flex-col p-2 bg-yellow-50 rounded-lg shadow-md w-full max-w-sm md:max-w-md">
                    <p className="text-sm font-semibold text-amber-700">Edit Message</p>
                    <textarea
                        ref={textareaRef}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full h-20 p-2 my-2 bg-white border rounded text-gray-900"
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-gray-200"><X size={20}/></button>
                        <button onClick={handleSave} className="p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600"><Check size={20}/></button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={bubbleClasses}>
                        {message.isEdited && (
                            <p className={clsx("text-xs mb-1", isOwnMessage ? 'text-amber-200' : 'text-gray-400')}>
                                edited
                            </p>
                        )}

                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {messageText}
                        </p>

                        <div className="flex items-center justify-end gap-1 mt-1">
                            <p className={clsx("text-xs", isOwnMessage ? 'text-amber-200' : 'text-gray-400')}>
                                    {displayTime}
                            </p>
                            {isOwnMessage && message.status === 'sending' && (
                                <Clock size={12} className="text-amber-200" />
                            )}
                            {isOwnMessage && message.status === 'failed' && (
                                <AlertCircle size={12} className="text-red-300" />
                            )}
                        </div>
                    </div>

                    <div className={clsx(
                        "w-12 h-full flex-shrink-0 flex items-center justify-center transition-opacity",
                        isHovering && canPerformActions ? "opacity-100" : "opacity-0"
                    )}>
                        <DropdownMenu>
                            {message.content?.type === 'text' && isWithinTimeLimit && (
                                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                    <Edit size={16} /> Edit
                                </DropdownMenuItem>
                            )}

                            <DropdownMenuItem onClick={() => onDeleteForMe(message._id)}>
                                <Trash2 size={16} /> Delete for Me
                            </DropdownMenuItem>
                            
                            {isWithinTimeLimit && (
                                <DropdownMenuItem onClick={() => onDeleteForAll(message._id)} className="text-red-600">
                                    <Trash2 size={16} /> Delete for Everyone
                                </DropdownMenuItem>
                            )}
                        </DropdownMenu>
                    </div>
                </>
            )}
        </div>
    );
}

export default MessageBubble;