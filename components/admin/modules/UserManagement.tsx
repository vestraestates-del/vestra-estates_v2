
import React, { useState, useMemo } from 'react';
import WidgetCard from '../../ui/WidgetCard.tsx';
import { adminUsers as initialUsers, AdminUser, SubscriptionPackage, AccountStatus } from '../../../data/adminData.ts';
import Button from '../../ui/Button.tsx';
import { SearchIcon } from '../../icons/EliteIcons.tsx';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.subscription.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const handleStatusChange = (userId: number, newStatus: AccountStatus) => {
        setUsers(users.map(user => user.id === userId ? { ...user, accountStatus: newStatus } : user));
    };

    const getStatusClasses = (status: AccountStatus) => {
        switch (status) {
            case 'Active': return 'bg-green-500/20 text-green-300';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-300';
            case 'Rejected': return 'bg-red-500/20 text-red-300';
            case 'Banned': return 'bg-gray-500/20 text-gray-400';
            default: return '';
        }
    };
    
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">User Management</h1>
                <p className="text-gray-400">View, manage, and monitor all platform members.</p>
            </header>
            <WidgetCard title="All Members">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name, country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm"
                        />
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
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-b border-gray-800 hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.country}</td>
                                    <td className="px-6 py-4">{user.subscription}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(user.accountStatus)}`}>
                                            {user.accountStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.accountStatus}
                                            onChange={(e) => handleStatusChange(user.id, e.target.value as AccountStatus)}
                                            className="bg-gray-800 border border-gray-600 rounded-md text-xs py-1 px-2"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Banned">Banned</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WidgetCard>
        </div>
    );
};

export default UserManagement;
