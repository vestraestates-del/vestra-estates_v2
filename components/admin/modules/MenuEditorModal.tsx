import React, { useState } from 'react';
import { CloseIcon } from '../../icons/EliteIcons';
import Button from '../../ui/Button';
import { MenuItem } from '../../../data/adminData';

interface MenuEditorModalProps {
    item: Partial<MenuItem> | null;
    onClose: () => void;
    onSave: (item: Partial<MenuItem>) => void;
}

const MenuEditorModal: React.FC<MenuEditorModalProps> = ({ item, onClose, onSave }) => {
    const [editedItem, setEditedItem] = useState(item || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedItem);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{item?.id ? 'Edit' : 'Add'} Menu Item</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="label" className="block text-sm font-medium text-gray-400 mb-1">Label</label>
                            <input id="label" name="label" type="text" value={editedItem.label || ''} onChange={handleChange} required placeholder="e.g., DASHBOARD" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="path" className="block text-sm font-medium text-gray-400 mb-1">Path</label>
                            <input id="path" name="path" type="text" value={editedItem.path || ''} onChange={handleChange} required placeholder="e.g., dashboard" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Item</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuEditorModal;
