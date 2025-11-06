
import React, { useState } from 'react';
import { CloseIcon, ShieldCheckIcon } from './icons/EliteIcons';
import Button from './ui/Button';

interface MfaModalProps {
    onClose: () => void;
    onVerify: (code: string) => void;
}

const MfaModal: React.FC<MfaModalProps> = ({ onClose, onVerify }) => {
    const [code, setCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim()) {
            onVerify(code);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Two-Factor Authentication</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-8 text-center">
                        <ShieldCheckIcon className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                        <p className="text-gray-300">Please enter the code from your authenticator app.</p>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            placeholder="_ _ _ _ _ _"
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-3xl text-center tracking-[0.5em] text-white mt-6 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={!code.trim()}>Verify</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MfaModal;
