import React from 'react';
import { CloseIcon } from './icons/EliteIcons.tsx';
import Button from './ui/Button.tsx';

interface TermsOfUseModalProps {
    onClose: () => void;
}

const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[70vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Terms of Use</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto text-gray-300 space-y-4 text-sm">
                    <p><strong>Last Updated: July 2024</strong></p>
                    <p>Welcome to the VESTRA ESTATES secure client portal. By accessing or using our platform, you agree to be bound by these Terms of Use and our Privacy Policy.</p>
                    
                    <h3 className="text-lg font-semibold text-white pt-2">1. Access and Use</h3>
                    <p>Access to this portal is granted on an invitation-only basis and is subject to our approval. Your access is for your personal, non-commercial use only. You agree not to share your access credentials with any third party.</p>

                    <h3 className="text-lg font-semibold text-white pt-2">2. Confidential Information</h3>
                    <p>All information provided within this portal, including but not limited to property listings, financial data, and member information, is considered highly confidential. You agree to maintain the confidentiality of this information and not to disclose it to any third party without the express written consent of VESTRA ESTATES.</p>

                    <h3 className="text-lg font-semibold text-white pt-2">3. Intellectual Property</h3>
                    <p>All content on this portal, including text, graphics, logos, and software, is the property of VESTRA ESTATES or its content suppliers and is protected by international copyright laws. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>

                    <h3 className="text-lg font-semibold text-white pt-2">4. Disclaimer of Warranties</h3>
                    <p>The information on this portal is provided "as is" without any warranties of any kind. While we strive for accuracy, we do not warrant that the information is complete, reliable, or current.</p>
                    
                    <h3 className="text-lg font-semibold text-white pt-2">5. Limitation of Liability</h3>
                    <p>VESTRA ESTATES shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this portal or its content.</p>

                </div>
                 <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUseModal;
