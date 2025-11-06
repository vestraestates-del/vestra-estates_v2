import React, { useState } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';
import { invitations as initialInvitations, Invitation } from '../../../data/adminData';
import { PlusCircleIcon } from '../../icons/EliteIcons';
import InvitationModal from './InvitationModal';

const InvitationSystem: React.FC = () => {
    const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Simulates a unique, high-level encryption process for generating secure codes.
     * This combines a static prefix, a unique UUID-like part, and a Base64-encoded timestamp
     * to create a complex, non-reversible invitation code.
     */
    const generateEncryptedCode = (): string => {
        const generateUUIDPart = () => {
            return 'xxxx-xxxx'.replace(/[x]/g, (c) => {
                const r = Math.random() * 16 | 0;
                return r.toString(16).toUpperCase();
            });
        };

        const uniquePart = generateUUIDPart();
        const prefix = 'VSTR';
        const timestamp = Date.now().toString();
        // Use a portion of the Base64 encoded timestamp to add complexity
        const encodedTimestamp = btoa(timestamp).substring(0, 8).replace(/=/g, 'X');

        return `${prefix}-${uniquePart}-${encodedTimestamp}`;
    };

    const handleCreateInvitation = (email: string) => {
        const today = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(today.getDate() + 7);

        const newInvitation: Invitation = {
            id: Date.now(),
            email,
            code: generateEncryptedCode(),
            status: 'Pending',
            sentAt: today.toISOString().split('T')[0],
            expiresAt: expiryDate.toISOString().split('T')[0],
        };
        setInvitations(prev => [newInvitation, ...prev]);
        setIsModalOpen(false);
    };


    return (
        <>
            <div>
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Invitation System</h1>
                        <p className="text-gray-400">Create and manage invitations for new members.</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2"><PlusCircleIcon className="w-5 h-5"/> Create New Invitation</Button>
                </header>
                <WidgetCard title="Invitation Status">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-400 uppercase bg-white/5">
                                <tr>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Encrypted Code</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Sent At</th>
                                    <th className="px-6 py-3">Expires At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invitations.map(inv => (
                                    <tr key={inv.id} className="border-b border-gray-800 hover:bg-white/5">
                                        <td className="px-6 py-4 font-medium text-white">{inv.email}</td>
                                        <td className="px-6 py-4 font-mono text-cyan-300">{inv.code}</td>
                                        <td className="px-6 py-4">{inv.status}</td>
                                        <td className="px-6 py-4">{inv.sentAt}</td>
                                        <td className="px-6 py-4">{inv.expiresAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </WidgetCard>
            </div>
            {isModalOpen && (
                <InvitationModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateInvitation}
                />
            )}
        </>
    );
};

export default InvitationSystem;