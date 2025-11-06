import React, { useState } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';

const Crm: React.FC = () => {
    const [audience, setAudience] = useState('All Members');
    const [message, setMessage] = useState('');

    const handleSendNotification = () => {
        if (!message.trim()) {
            alert('Please compose a message before sending.');
            return;
        }
        alert(`Notification sent to: ${audience}\n\nMessage: "${message}"`);
        setMessage('');
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">CRM & Communications</h1>
                <p className="text-gray-400">Manage member communications and send bulk notifications.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WidgetCard title="Message Box (Members -> Concierge)">
                    {/* Mockup of a message inbox */}
                    <div className="space-y-2">
                        <div className="p-3 bg-white/5 rounded-lg">
                            <p className="font-semibold text-white">From: Adrian Roth</p>
                            <p className="text-sm text-gray-300 truncate">"I'm interested in the latest market report for Monaco..."</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg">
                            <p className="font-semibold text-white">From: Sofia Petrova</p>
                            <p className="text-sm text-gray-300 truncate">"Please arrange a helicopter for Friday morning."</p>
                        </div>
                    </div>
                </WidgetCard>
                <WidgetCard title="Send Bulk Notification">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-400">Audience Segment</label>
                            <select 
                                value={audience} 
                                onChange={(e) => setAudience(e.target.value)}
                                className="w-full bg-gray-900 border-gray-700 rounded p-2 mt-1"
                            >
                                <option>All Members</option>
                                <option>Royal Black Access</option>
                                <option>Diamond Access</option>
                                <option>Elit Access</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Message</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Compose your message..." 
                                className="w-full h-24 bg-gray-900 border-gray-700 rounded p-2 mt-1"
                            ></textarea>
                        </div>
                        <Button onClick={handleSendNotification}>Send Notification</Button>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default Crm;
