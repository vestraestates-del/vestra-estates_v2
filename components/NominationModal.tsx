import React, { useState } from 'react';
import { CloseIcon, UsersGroupIcon } from './icons/EliteIcons';
import Button from './ui/Button';

interface NominationModalProps {
    onClose: () => void;
    onSave: (details: { name: string; email: string; justification: string }) => void;
}

const NominationModal: React.FC<NominationModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [justification, setJustification] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !justification.trim()) {
            alert("Please fill all fields.");
            return;
        }
        onSave({ name, email, justification });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in overscroll-contain" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Nominate a New Member</h2>
                        <p className="text-sm text-gray-400">Propose a candidate for The Circle.</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nominee's Full Name</label>
                            <input
                                id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Dr. Evelyn Reed" required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Nominee's Email</label>
                            <input
                                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g., e.reed@innovate.corp" required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="justification" className="block text-sm font-medium text-gray-400 mb-1">Justification for Nomination</label>
                            <textarea
                                id="justification" value={justification} onChange={(e) => setJustification(e.target.value)}
                                placeholder="Briefly explain why this individual would be a valuable addition to The Circle..."
                                rows={4} required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit" className="flex items-center gap-2">
                            <UsersGroupIcon className="w-4 h-4"/>
                            Submit Nomination
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NominationModal;