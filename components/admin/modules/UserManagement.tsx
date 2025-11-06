import React, { useState } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';
import { adminUsers, AdminUser, AccountStatus, SubscriptionPackage } from '../../../data/adminData';
import { SearchIcon } from '../../icons/EliteIcons';

const UserDetailModal: React.FC<{ user: AdminUser; onClose: () => void; onSave: (user: AdminUser) => void }> = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">User Profile: {user.name}</h2>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    {/* Form fields for user details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm text-gray-400">Name</label><input type="text" name="name" value={editedUser.name} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                        <div><label className="text-sm text-gray-400">Country</label><input type="text" name="country" value={editedUser.country} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                        <div><label className="text-sm text-gray-400">Account Status</label><select name="accountStatus" value={editedUser.accountStatus} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2"><option>Active</option><option>Pending</option><option>Rejected</option><option>Banned</option></select></div>
                        <div><label className="text-sm text-gray-400">Subscription</label><select name="subscription" value={editedUser.subscription} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2"><option>Elit Access</option><option>Diamond Access</option><option>Royal Black Access</option></select></div>
                         <div><label className="text-sm text-gray-400">VIP Tag</label><input type="text" name="vipTag" value={editedUser.vipTag || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                         <div><label className="text-sm text-gray-400">Assigned Concierge</label><input type="text" name="assignedConcierge" value={editedUser.assignedConcierge || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                    </div>
                    <div><label className="text-sm text-gray-400">Admin Notes</label><textarea name="notes" value={editedUser.notes} onChange={handleChange} className="w-full h-24 bg-gray-900 border-gray-700 rounded p-2"></textarea></div>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSave(editedUser)}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};


const UserManagement: React.FC = () => {
    const [users, setUsers] = useState(adminUsers);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

    const handleSaveUser = (updatedUser: AdminUser) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setSelectedUser(null);
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">User Management (CRM)</h1>
                <p className="text-gray-400">View, edit, and manage member profiles.</p>
            </header>
            <WidgetCard title="All Members">
                {/* Filters and Search */}
                <div className="flex justify-between items-center mb-4">
                    <div className="relative"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /><input type="text" placeholder="Search users..." className="bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm" /></div>
                </div>
                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Subscription</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Country</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-800 hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.subscription}</td>
                                    <td className="px-6 py-4">{user.accountStatus}</td>
                                    <td className="px-6 py-4">{user.country}</td>
                                    <td className="px-6 py-4"><Button size="sm" onClick={() => setSelectedUser(user)}>View Details</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WidgetCard>
            {selectedUser && <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} onSave={handleSaveUser} />}
        </div>
    );
};

export default UserManagement;
