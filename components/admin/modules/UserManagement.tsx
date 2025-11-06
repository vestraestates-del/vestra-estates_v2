// This is the full content of components/admin/modules/UserManagement.tsx

import React, { useState, useMemo } from 'react';
import WidgetCard from '../../ui/WidgetCard.tsx';
import { MockUser, AccountStatus } from '../../../data/userData.ts';
import Button from '../../ui/Button.tsx';
import { SearchIcon, CloseIcon } from '../../icons/EliteIcons.tsx';

interface UserManagementProps {
    users: MockUser[];
    setUsers: React.Dispatch<React.SetStateAction<{ [key: string]: MockUser }>>;
}

const getStatusClasses = (status: AccountStatus) => {
    switch (status) {
        case 'Active': return 'bg-green-500/20 text-green-300';
        case 'Pending': return 'bg-yellow-500/20 text-yellow-300';
        case 'Banned': return 'bg-red-500/20 text-red-300';
    }
};

const UserEditModal: React.FC<{
    user: MockUser;
    onClose: () => void;
    onSave: (updatedUser: MockUser) => void;
}> = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Manage User: {user.name}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white"><CloseIcon className="w-6 h-6"/></button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label className="text-sm font-medium text-gray-400">Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 mt-1"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-400">Country</label>
                        <input name="country" value={formData.country} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 mt-1"/>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-400">Subscription Tier</label>
                            <select name="tier" value={formData.tier} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 mt-1">
                                <option>Elit Access</option>
                                <option>Diamond Access</option>
                                <option>Royal Black Access</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400">Account Status</label>
                             <select name="accountStatus" value={formData.accountStatus} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 mt-1">
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Banned</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-400">Assigned Concierge</label>
                        <input name="assignedConcierge" value={formData.assignedConcierge} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 mt-1"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-400">Admin Notes</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 mt-1"/>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </div>
            </div>
        </div>
    )
}

const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<AccountStatus | 'All'>('All');
    const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

    const filteredUsers = useMemo(() => {
        return users
            .filter(user => filterStatus === 'All' || user.accountStatus === filterStatus)
            .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [users, searchTerm, filterStatus]);

    const handleSaveUser = (updatedUser: MockUser) => {
        setUsers(prevUsers => ({
            ...prevUsers,
            [updatedUser.email]: updatedUser
        }));
        setSelectedUser(null);
    };
    
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">User Management</h1>
                <p className="text-gray-400">View, edit, and manage all member accounts.</p>
            </header>
            <WidgetCard title={`All Members (${filteredUsers.length})`}>
                <div className="flex justify-between items-center mb-4">
                     <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm" 
                        />
                    </div>
                    <div>
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="bg-gray-900 border-gray-700 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Banned">Banned</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Country</th>
                                <th scope="col" className="px-6 py-3">Subscription</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Concierge</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.email} className="border-b border-gray-800 hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.country}</td>
                                    <td className="px-6 py-4">{user.tier}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(user.accountStatus!)}`}>
                                            {user.accountStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{user.assignedConcierge}</td>
                                    <td className="px-6 py-4">
                                        <Button size="sm" onClick={() => setSelectedUser(user)}>Manage</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WidgetCard>

            {selectedUser && <UserEditModal user={selectedUser} onClose={() => setSelectedUser(null)} onSave={handleSaveUser} />}
        </div>
    );
};

export default UserManagement;