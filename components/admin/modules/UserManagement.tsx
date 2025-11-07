import React, { useState, useMemo } from 'react';
import WidgetCard from '../../ui/WidgetCard.tsx';
import { adminUsers as initialUsers, AdminUser, SubscriptionPackage, AccountStatus } from '../../../data/adminData.ts';
import Button from '../../ui/Button.tsx';
import { SearchIcon, PlusCircleIcon, EditIcon, TrashIcon } from '../../icons/EliteIcons.tsx';
import UserEditModal from './UserEditModal.tsx';
import ConfirmationModal from '../../ConfirmationModal.tsx';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [subscriptionFilter, setSubscriptionFilter] = useState<SubscriptionPackage | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<AccountStatus | 'All'>('All');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            (subscriptionFilter === 'All' || user.subscription === subscriptionFilter) &&
            (statusFilter === 'All' || user.accountStatus === statusFilter) &&
            (
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.vipTag && user.vipTag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.assignedConcierge && user.assignedConcierge.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    }, [users, searchTerm, subscriptionFilter, statusFilter]);
    
    const handleOpenModal = (user: AdminUser | null = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleOpenConfirm = (user: AdminUser) => {
        setDeletingUser(user);
        setIsConfirmOpen(true);
    };

    const handleSaveUser = (userToSave: AdminUser) => {
        if (users.some(u => u.id === userToSave.id)) {
            setUsers(users.map(u => u.id === userToSave.id ? userToSave : u));
        } else {
            setUsers(prev => [...prev, { ...userToSave, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteUser = () => {
        if (deletingUser) {
            setUsers(users.filter(u => u.id !== deletingUser.id));
            setIsConfirmOpen(false);
            setDeletingUser(null);
        }
    };

    const getStatusClasses = (status: AccountStatus) => {
        switch (status) {
            case 'Active': return 'bg-green-500/20 text-green-300 border border-green-500/30';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
            case 'Rejected': return 'bg-red-500/20 text-red-300 border border-red-500/30';
            case 'Banned': return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
            default: return '';
        }
    };
    
    return (
        <>
            <div>
                <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">User Management</h1>
                        <p className="text-gray-400">View, manage, and monitor all platform members.</p>
                    </div>
                     <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 self-start md:self-auto">
                        <PlusCircleIcon className="w-5 h-5"/> Add New User
                    </Button>
                </header>
                
                <div className="bg-black/50 border border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:flex-1">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by name, country, tag..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div className="flex w-full md:w-auto gap-4">
                             <select value={subscriptionFilter} onChange={(e) => setSubscriptionFilter(e.target.value as any)} className="w-full md:w-48 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500">
                                <option value="All">All Subscriptions</option>
                                <option value="Elit Access">Elit Access</option>
                                <option value="Diamond Access">Diamond Access</option>
                                <option value="Royal Black Access">Royal Black Access</option>
                            </select>
                             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="w-full md:w-40 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500">
                                <option value="All">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Banned">Banned</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="bg-black/50 border border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/10 relative group">
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <Button size="sm" variant="secondary" onClick={() => handleOpenModal(user)}><EditIcon className="w-4 h-4"/></Button>
                                <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400" onClick={() => handleOpenConfirm(user)}><TrashIcon className="w-4 h-4"/></Button>
                            </div>

                            <div className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusClasses(user.accountStatus)}`}>
                                {user.accountStatus}
                            </div>
                            
                            <div className="flex flex-col items-center text-center pt-8">
                                <img src={`https://i.pravatar.cc/150?u=${user.name.split(' ').join('')}`} alt={user.name} className="w-20 h-20 rounded-full border-2 border-gray-700" />
                                <h3 className="font-semibold text-lg text-white mt-4">{user.name}</h3>
                                <p className="text-sm text-gray-400">{user.country}</p>

                                {user.vipTag && (
                                    <p className="mt-2 text-xs font-semibold bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-500/30">{user.vipTag}</p>
                                )}
                                
                                <div className="w-full border-t border-gray-800 my-4"></div>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Subscription</p>
                                        <p className="text-sm font-bold text-cyan-400">{user.subscription}</p>
                                    </div>
                                    <div className="text-center">
                                         <p className="text-xs text-gray-500 uppercase tracking-wider">Concierge</p>
                                        <p className="text-sm font-semibold text-gray-300">{user.assignedConcierge || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <UserEditModal 
                    user={editingUser}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveUser}
                />
            )}
            {isConfirmOpen && deletingUser && (
                <ConfirmationModal
                    title="Delete User"
                    message={`Are you sure you want to permanently delete the user '${deletingUser.name}'? This action cannot be undone.`}
                    onConfirm={handleDeleteUser}
                    onClose={() => setIsConfirmOpen(false)}
                    confirmText="Delete"
                />
            )}
        </>
    );
};

export default UserManagement;
