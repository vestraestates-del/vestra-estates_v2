import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../../icons/EliteIcons';
import Button from '../../ui/Button';
import { RequestItem } from '../../../data/appData';

interface ServiceRequestModalProps {
    request: Partial<RequestItem> | null;
    onClose: () => void;
    onSave: (request: RequestItem) => void;
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ request, onClose, onSave }) => {
    const [editedRequest, setEditedRequest] = useState<Partial<RequestItem>>(request || {});

    useEffect(() => {
        setEditedRequest(request || {});
    }, [request]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedRequest(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: editedRequest.id || Date.now(),
            title: editedRequest.title || '',
            type: editedRequest.type || 'Action',
            assignee: editedRequest.assignee || 'Admin',
            status: editedRequest.status || 'Pending',
            requester: editedRequest.requester || 'Admin',
            details: editedRequest.details || ''
        });
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{request?.id ? 'Edit' : 'Create'} Service Request</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6"/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="p-6 space-y-4 overflow-y-auto">
                        <div><label className="text-sm text-gray-400">Title</label><input type="text" name="title" value={editedRequest.title || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                        <div><label className="text-sm text-gray-400">Requester</label><input type="text" name="requester" value={editedRequest.requester || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                        <div><label className="text-sm text-gray-400">Assignee</label><input type="text" name="assignee" value={editedRequest.assignee || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                        <div><label className="text-sm text-gray-400">Status</label><select name="status" value={editedRequest.status || 'Pending'} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2"><option>Pending</option><option>In Progress</option><option>Urgent</option><option>Completed</option></select></div>
                        <div><label className="text-sm text-gray-400">Details</label><textarea name="details" value={editedRequest.details || ''} onChange={handleChange} className="w-full h-24 bg-gray-900 border-gray-700 rounded p-2"></textarea></div>
                    </div>
                    <div className="p-4 border-t border-gray-800 flex justify-end gap-2">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceRequestModal;
