import React from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';

interface ConfirmationModalProps {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-gray-300 whitespace-pre-wrap">{message}</p>
                </div>
                <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                    <Button variant="secondary" type="button" onClick={onClose}>{cancelText}</Button>
                    <Button variant="primary" type="button" onClick={onConfirm} className="bg-red-600 hover:bg-red-700 focus:ring-red-500">
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
