
import React from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';

interface PrivacyModalProps {
    onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[70vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto text-gray-300 space-y-4 text-sm">
                    <p><strong>Last Updated: July 2024</strong></p>
                    <p>VESTRA ESTATES ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our secure client portal.</p>
                    
                    <h3 className="text-lg font-semibold text-white pt-2">1. Information We Collect</h3>
                    <p>We may collect personally identifiable information, such as your name, email address, and financial information, that you voluntarily provide to us when you register for an account or use our services.</p>

                    <h3 className="text-lg font-semibold text-white pt-2">2. Use of Your Information</h3>
                    <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the portal to:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Create and manage your account.</li>
                        <li>Provide you with personalized services and information.</li>
                        <li>Increase the efficiency and operation of the portal.</li>
                        <li>Monitor and analyze usage and trends to improve your experience.</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-white pt-2">3. Disclosure of Your Information</h3>
                    <p>We do not share, sell, rent, or trade your information with any third parties for their promotional purposes. All information is held in the strictest confidence.</p>

                    <h3 className="text-lg font-semibold text-white pt-2">4. Security of Your Information</h3>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. We employ end-to-end encryption for all data in transit and at rest.</p>
                </div>
                 <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
