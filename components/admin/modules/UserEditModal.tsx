import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../../icons/EliteIcons';
import Button from '../../ui/Button';
import { AdminUser, SubscriptionPackage, AccountStatus } from '../../../data/adminData';

interface UserEditModalProps {
    user: AdminUser | null;
    onClose: () => void;
    onSave: (user: AdminUser) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<AdminUser>>(user || {});

    useEffect(() => {
        setFormData(user || {});
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as AdminUser);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{user ? 'Edit User' : 'Add New User'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                <input id="name" name="name" type="text" value={formData.name || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                                <input id="country" name="country" type="text" value={formData.country || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="subscription" className="block text-sm font-medium text-gray-400 mb-1">Subscription</label>
                                <select id="subscription" name="subscription" value={formData.subscription || 'Elit Access'} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300">
                                    <option value="Elit Access">Elit Access</option>
                                    <option value="Diamond Access">Diamond Access</option>
                                    <option value="Royal Black Access">Royal Black Access</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="accountStatus" className="block text-sm font-medium text-gray-400 mb-1">Account Status</label>
                                <select id="accountStatus" name="accountStatus" value={formData.accountStatus || 'Pending'} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300">
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="vipTag" className="block text-sm font-medium text-gray-400 mb-1">VIP Tag (Optional)</label>
                                <input id="vipTag" name="vipTag" type="text" value={formData.vipTag || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                            </div>
                            <div>
                                <label htmlFor="assignedConcierge" className="block text-sm font-medium text-gray-400 mb-1">Assigned Concierge</label>
                                <input id="assignedConcierge" name="assignedConcierge" type="text" value={formData.assignedConcierge || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-400 mb-1">Admin Notes</label>
                            <textarea
                                id="notes" name="notes" value={formData.notes || ''} onChange={handleChange}
                                rows={4}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300"
                            />
                        </div>

                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save User</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;
