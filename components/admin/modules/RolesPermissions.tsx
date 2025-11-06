
import React, { useState } from 'react';
import WidgetCard from '../../ui/WidgetCard.tsx';
import { UserRole } from '../../../data/adminData.ts';
import Button from '../../ui/Button.tsx';
import Checkbox from '../../ui/Checkbox.tsx';

const initialRoles: { role: UserRole, permissions: Record<string, boolean> }[] = [
    { role: 'Admin', permissions: { 'Full Access': true, 'Manage Users': true, 'Manage Assets': true, 'Manage Service Desk': true, 'Manage CMS': true, 'View Analytics': true } },
    { role: 'Content Manager', permissions: { 'Manage CMS': true, 'View Analytics': true } },
    { role: 'Concierge Manager', permissions: { 'Manage Service Desk': true, 'View Users': true } },
    { role: 'Support', permissions: { 'View Service Desk': true } },
];
const allPermissions = ['Full Access', 'Manage Users', 'Manage Assets', 'Manage Service Desk', 'Manage CMS', 'View Analytics'];

const RolesPermissions: React.FC = () => {
    const [roles, setRoles] = useState(initialRoles);

    const handlePermissionChange = (role: UserRole, permission: string, checked: boolean) => {
        setRoles(roles.map(r => {
            if (r.role === role) {
                const newPermissions = { ...r.permissions, [permission]: checked };
                if (permission === 'Full Access' && checked) {
                    // If full access is granted, check all others
                    allPermissions.forEach(p => newPermissions[p] = true);
                } else if (permission === 'Full Access' && !checked) {
                    // If full access is revoked, uncheck all others
                    allPermissions.forEach(p => newPermissions[p] = false);
                }
                return { ...r, permissions: newPermissions };
            }
            return r;
        }));
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Roles & Permissions</h1>
                <p className="text-gray-400">Define access levels for administrative roles.</p>
            </header>
            <WidgetCard title="Role Permissions Matrix">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                                <th className="px-6 py-3">Role</th>
                                {allPermissions.map(p => <th key={p} className="px-6 py-3 text-center">{p}</th>)}
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {roles.map(({ role, permissions }) => (
                                <tr key={role} className="border-b border-gray-800">
                                    <td className="px-6 py-4 font-semibold text-white">{role}</td>
                                    {allPermissions.map(p => (
                                        <td key={p} className="px-6 py-4 text-center">
                                            <Checkbox 
                                                label=""
                                                checked={!!permissions[p]} 
                                                onChange={e => handlePermissionChange(role, p, e.target.checked)}
                                                disabled={(permissions['Full Access'] && p !== 'Full Access') || role === 'Admin'}
                                                className="form-checkbox h-5 w-5 bg-gray-800 border-gray-600 rounded text-cyan-500 focus:ring-cyan-500 disabled:opacity-50"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Permissions saved!')}>Save Changes</Button>
                </div>
            </WidgetCard>
        </div>
    );
};

export default RolesPermissions;
