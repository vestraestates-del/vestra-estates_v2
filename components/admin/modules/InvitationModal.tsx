import React, { useState } from 'react';
import { CloseIcon } from '../../icons/EliteIcons';
import Button from '../../ui/Button';

interface InvitationModalProps {
    onClose: () => void;
    onCreate: (email: string) => void;
}

const InvitationModal: React.FC<InvitationModalProps> = ({ onClose, onCreate }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            onCreate(email);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Create New Invitation</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                            Enter the email address of the prospective member. A unique, encrypted invitation code will be generated.
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g., new.prospect@example.com"
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={!email.trim()}>Generate & Send</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InvitationModal;