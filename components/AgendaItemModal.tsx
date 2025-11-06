
import React, { useState, useEffect } from 'react';
// FIX: Added file extension to appData import
import type { AgendaItem } from '../data/appData.ts';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';

interface AgendaItemModalProps {
    item: AgendaItem | null;
    onSave: (item: AgendaItem) => void;
    onClose: () => void;
}

const AgendaItemModal: React.FC<AgendaItemModalProps> = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        time: '',
        title: '',
        location: '',
        notes: '',
        priority: 'Medium' as 'High' | 'Medium' | 'Low',
    });

    useEffect(() => {
        if (item) {
            setFormData({
                time: item.time,
                title: item.title,
                location: item.location,
                notes: item.notes || '',
                priority: item.priority || 'Medium',
            });
        } else {
             setFormData({ time: '', title: '', location: '', notes: '', priority: 'Medium' });
        }
    }, [item]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const itemToSave: AgendaItem = {
            ...(item || { id: Date.now(), completed: false }),
            ...formData,
        };
        onSave(itemToSave);
    };

    const title = item ? 'Edit Agenda Item' : 'Add New Agenda Item';

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                                <input
                                    id="time"
                                    name="time"
                                    type="text"
                                    value={formData.time}
                                    onChange={handleChange}
                                    placeholder="e.g., 10:30"
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                             <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Board Meeting"
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Virtual Call"
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-400 mb-1">Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Add any relevant details or context..."
                                rows={4}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgendaItemModal;