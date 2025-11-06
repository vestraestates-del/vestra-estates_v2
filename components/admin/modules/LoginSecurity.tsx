import React, { useState } from 'react';
import WidgetCard from '../../ui/WidgetCard.tsx';
import Button from '../../ui/Button.tsx';

interface LoginSecurityProps {
    handleChangeAdminPassword: (currentPassword: string, newPassword: string) => { success: boolean; message: string };
    currentUserEmail: string;
}

const LoginSecurity: React.FC<LoginSecurityProps> = ({ handleChangeAdminPassword, currentUserEmail }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handlePasswordChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords do not match." });
            return;
        }
        if (newPassword.length < 8) {
            setMessage({ type: 'error', text: "New password must be at least 8 characters long." });
            return;
        }
        const result = handleChangeAdminPassword(currentPassword, newPassword);
        setMessage({ type: result.success ? 'success' : 'error', text: result.message });
        if (result.success) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Login & Security</h1>
                <p className="text-gray-400">Manage platform-wide security settings and policies.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WidgetCard title="Admin Password Management">
                    <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-400">Current Password for {currentUserEmail}</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="w-full bg-gray-900 border-gray-700 rounded p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full bg-gray-900 border-gray-700 rounded p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full bg-gray-900 border-gray-700 rounded p-2 mt-1"
                            />
                        </div>
                        {message && (
                            <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message.text}
                            </p>
                        )}
                        <Button
                            size="sm"
                            type="submit"
                            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                        >
                            Change Admin Password
                        </Button>
                    </form>
                </WidgetCard>
                <WidgetCard title="Multi-Factor Authentication (MFA)">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-300">Enforce MFA for all user accounts to enhance security.</p>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <span>Enforce MFA for all users</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                        <Button size="sm">Save MFA Policy</Button>
                    </div>
                </WidgetCard>
                <WidgetCard title="Password Policy">
                    <div className="space-y-4">
                         <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <span>Minimum Length</span>
                            <input type="number" defaultValue={12} className="w-16 bg-gray-900 border-gray-700 rounded p-1 text-center" />
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <span>Require Uppercase & Lowercase</span>
                            <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 bg-gray-800 border-gray-600 rounded text-cyan-500" />
                        </div>
                         <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <span>Require Numbers & Symbols</span>
                            <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 bg-gray-800 border-gray-600 rounded text-cyan-500" />
                        </div>
                        <Button size="sm">Save Password Policy</Button>
                    </div>
                </WidgetCard>
                 <WidgetCard title="Session Management">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <span>Session Timeout (minutes)</span>
                            <input type="number" defaultValue={30} className="w-20 bg-gray-900 border-gray-700 rounded p-1 text-center" />
                        </div>
                        <Button size="sm">Save Session Policy</Button>
                     </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default LoginSecurity;