import React, { useState, useMemo, lazy, Suspense } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';
import { UserRole, adminUsers, AdminUser } from '../../../data/adminData';
import { DocumentTextIcon, CheckCircleIcon, BanIcon, ShieldCheckIcon, ClockIcon, FingerprintIcon, GlobeHeartIcon, SearchIcon } from '../../icons/EliteIcons';

const ConfirmationModal = lazy(() => import('../../ConfirmationModal'));

const roles: UserRole[] = ['Admin', 'Content Manager', 'Concierge Manager', 'Support'];

interface SecurityLog {
    id: number;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'CRITICAL';
    actor: string;
    event: string;
    ip: string;
}

const initialSecurityLogs: SecurityLog[] = [
    { id: 1, timestamp: new Date().toISOString(), level: 'INFO', actor: 'admin@vestra.com', event: 'Successful login to Admin Panel', ip: '88.12.34.56' },
    { id: 2, timestamp: new Date(Date.now() - 60000).toISOString(), level: 'WARN', actor: 'kenji@vestra.com', event: 'Failed login attempt (invalid password)', ip: '103.45.67.89' },
    { id: 3, timestamp: new Date(Date.now() - 120000).toISOString(), level: 'CRITICAL', actor: 'Unknown', event: 'Brute-force attempt detected and blocked', ip: '201.98.76.54' },
    { id: 4, timestamp: new Date(Date.now() - 300000).toISOString(), level: 'INFO', actor: 'adrian@vestra.com', event: 'Password changed successfully', ip: '92.34.56.78' },
    { id: 5, timestamp: new Date(Date.now() - 600000).toISOString(), level: 'INFO', actor: 'admin@vestra.com', event: 'Updated IP blocklist', ip: '88.12.34.56' },
];

const getLogLevelClasses = (level: SecurityLog['level']) => {
    switch (level) {
        case 'CRITICAL': return 'bg-red-500/20 text-red-300';
        case 'WARN': return 'bg-yellow-500/20 text-yellow-300';
        default: return 'bg-gray-500/10 text-gray-400';
    }
};

const allCountries = ['North Korea', 'Iran', 'Russia', 'China', 'Syria', 'Cuba'];

const LoginSecurity: React.FC = () => {
    const [verifications, setVerifications] = useState<AdminUser[]>(adminUsers.filter(u => u.accountStatus === 'Pending'));
    const [confirmAction, setConfirmAction] = useState<{ action: 'approve' | 'reject'; user: AdminUser } | null>(null);
    
    // New state for security features
    const [sessionTimeout, setSessionTimeout] = useState(30);
    const [mfaEnforced, setMfaEnforced] = useState(false);
    const [blockedIps, setBlockedIps] = useState([{ ip: '201.98.76.54', note: 'Brute-force attempt' }]);
    const [newIp, setNewIp] = useState('');
    const [blockedCountries, setBlockedCountries] = useState(['North Korea', 'Iran']);
    const [logSearchTerm, setLogSearchTerm] = useState('');

    const handleApprove = (user: AdminUser) => {
        setVerifications(prev => prev.filter(u => u.id !== user.id));
        setConfirmAction(null);
    };

    const handleReject = (user: AdminUser) => {
        setVerifications(prev => prev.filter(u => u.id !== user.id));
        setConfirmAction(null);
    };
    
    const handleAddIp = () => {
        if (newIp.trim() && !blockedIps.some(item => item.ip === newIp.trim())) {
            setBlockedIps(prev => [...prev, { ip: newIp.trim(), note: 'Manually added' }]);
            setNewIp('');
        }
    };
    
    const handleRemoveIp = (ipToRemove: string) => {
        setBlockedIps(prev => prev.filter(item => item.ip !== ipToRemove));
    };

    const filteredLogs = useMemo(() => 
        initialSecurityLogs.filter(log => 
            log.actor.toLowerCase().includes(logSearchTerm.toLowerCase()) ||
            log.event.toLowerCase().includes(logSearchTerm.toLowerCase()) ||
            log.ip.toLowerCase().includes(logSearchTerm.toLowerCase())
        ), [logSearchTerm]);

    return (
        <>
            <div>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Login & Security Center</h1>
                    <p className="text-gray-400">Monitor, manage, and harden platform security.</p>
                </header>

                {/* Security Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <WidgetCard title="Security Events (24h)"><p className="text-3xl font-bold text-yellow-400">3</p></WidgetCard>
                    <WidgetCard title="Active MFA Users"><p className="text-3xl font-bold text-white">4 / 6</p></WidgetCard>
                    <WidgetCard title="Threats Blocked (24h)"><p className="text-3xl font-bold text-red-400">1</p></WidgetCard>
                    <WidgetCard title="Firewall Status"><p className="text-3xl font-bold text-green-400">Active</p></WidgetCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Access Control */}
                    <WidgetCard title="Access Control Policies">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FingerprintIcon className="w-5 h-5 text-cyan-400"/>
                                    <p className="font-semibold text-white">Enforce MFA for all users</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={mfaEnforced} onChange={(e) => setMfaEnforced(e.target.checked)} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                                </label>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <ClockIcon className="w-5 h-5 text-cyan-400"/>
                                    <p className="font-semibold text-white">Session Timeout (minutes)</p>
                                </div>
                                <input type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(Number(e.target.value))} className="w-20 bg-gray-900 border-gray-700 rounded p-1 text-center" />
                            </div>
                             <div className="p-3 bg-white/5 rounded-lg">
                                <p className="font-semibold text-white mb-2">Password Complexity Rules</p>
                                <p className="text-xs text-gray-400">Enforced: Min 12 characters, 1 uppercase, 1 number, 1 special character.</p>
                            </div>
                            <Button className="w-full mt-2" onClick={() => alert('Access policies saved!')}>Save Access Policies</Button>
                        </div>
                    </WidgetCard>
                    
                    {/* Threat Management */}
                    <WidgetCard title="Threat Management">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-white mb-2">IP Address Blocklist</h4>
                                <div className="space-y-2 max-h-24 overflow-y-auto mb-2 pr-2">
                                    {blockedIps.map(item => <div key={item.ip} className="flex justify-between items-center bg-gray-900/50 p-1.5 rounded text-sm font-mono"><span className="text-gray-300">{item.ip}</span><Button size="sm" variant="ghost" className="px-1 py-0 h-5" onClick={() => handleRemoveIp(item.ip)}>Remove</Button></div>)}
                                </div>
                                <div className="flex gap-2">
                                    <input type="text" value={newIp} onChange={(e) => setNewIp(e.target.value)} placeholder="Enter IP to block..." className="flex-1 bg-gray-900 border-gray-700 rounded p-1.5 text-sm"/>
                                    <Button size="sm" onClick={handleAddIp}>Add IP</Button>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-2">Country Blocking</h4>
                                {/* FIX: Add 'any' type to the 'option' parameter in the select onChange handler to resolve a TypeScript error where 'value' was not found on type 'unknown'. */}
                                <select multiple value={blockedCountries} onChange={(e) => setBlockedCountries(Array.from(e.target.selectedOptions, (option: any) => option.value))} className="w-full h-24 bg-gray-900 border-gray-700 rounded p-2 text-sm">
                                    {allCountries.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                             <Button className="w-full mt-2" onClick={() => alert('Threat management rules saved!')}>Save Threat Rules</Button>
                        </div>
                    </WidgetCard>

                    {/* User Verification */}
                    <div className="lg:col-span-2">
                        <WidgetCard title="User Verification Queue">
                            {verifications.length > 0 ? (
                                <div className="space-y-4">
                                    {verifications.map(user => (
                                        <div key={user.id} className="p-4 bg-white/5 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                            <div><p className="font-semibold text-white">{user.name}</p><p className="text-sm text-gray-400">Applying for: {user.subscription}</p></div>
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <Button size="sm" variant="ghost" className="flex items-center gap-2"><DocumentTextIcon className="w-4 h-4" /> View Docs</Button>
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setConfirmAction({ action: 'approve', user })}><CheckCircleIcon className="w-4 h-4" /> Approve</Button>
                                                <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => setConfirmAction({ action: 'reject', user })}><BanIcon className="w-4 h-4" /> Reject</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (<p className="text-center text-gray-500 py-4">No pending verifications.</p>)}
                        </WidgetCard>
                    </div>
                    
                     {/* Security Audit Log */}
                    <div className="lg:col-span-2">
                        <WidgetCard title="Security Audit Log">
                            <div className="relative mb-4"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /><input type="text" value={logSearchTerm} onChange={(e) => setLogSearchTerm(e.target.value)} placeholder="Search logs by user, event, or IP..." className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm" /></div>
                            <div className="h-96 overflow-y-auto space-y-2 font-mono text-xs pr-2">
                                {filteredLogs.map(log => (
                                    <div key={log.id} className={`p-2 rounded flex flex-wrap items-center gap-x-3 gap-y-1 ${getLogLevelClasses(log.level)}`}>
                                        <span className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                                        <span className="font-semibold">{log.level}</span>
                                        <span className="text-cyan-300">[{log.actor}]</span>
                                        <span className="text-gray-300 flex-1 min-w-[200px]">{log.event}</span>
                                        <span className="text-yellow-400">({log.ip})</span>
                                    </div>
                                ))}
                            </div>
                        </WidgetCard>
                    </div>
                </div>
            </div>
            <Suspense fallback={null}>
                {confirmAction && (
                    <ConfirmationModal
                        title={`${confirmAction.action === 'approve' ? 'Approve' : 'Reject'} User`}
                        message={`Are you sure you want to ${confirmAction.action} the application for ${confirmAction.user.name}? This action cannot be undone.`}
                        onConfirm={() => confirmAction.action === 'approve' ? handleApprove(confirmAction.user) : handleReject(confirmAction.user)}
                        onClose={() => setConfirmAction(null)}
                        confirmText={confirmAction.action === 'approve' ? 'Approve User' : 'Reject User'}
                    />
                )}
            </Suspense>
        </>
    );
};

export default LoginSecurity;
