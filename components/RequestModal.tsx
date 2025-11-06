
import React, { useState } from 'react';
// FIX: Added file extension to appData import
import type { RequestItem } from '../data/appData.ts';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';

interface RequestModalProps {
    onSave: (request: Omit<RequestItem, 'id'>) => void;
    onClose: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'Approval' | 'Action' | 'Information'>('Action');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Please enter a title for the request.");
            return;
        }
        const newRequest = {
            title,
            type,
            assignee: "C. Blackwood", // Default assignee for new user requests
            status: 'Pending' as const,
        };
        onSave(newRequest);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Submit New Request</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                         <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Request</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Arrange transport for Geneva trip"
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value as any)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="Action">Action</option>
                                <option value="Approval">Approval</option>
                                <option value="Information">Information</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Submit Request</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestModal;