import React, { useState } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';
import { User } from '../App';

interface PrivacyAgreementModalProps {
    user: User;
    onClose: () => void;
    onConfirm: () => void;
}

const PrivacyAgreementModal: React.FC<PrivacyAgreementModalProps> = ({ user, onClose, onConfirm }) => {
    const { language } = useLocalization();
    const [consentGiven, setConsentGiven] = useState(false);

    const effectiveDate = new Date().toLocaleDateString(language, { day: '2-digit', month: '2-digit', year: 'numeric' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (consentGiven) {
            onConfirm();
        } else {
            alert("You must agree to the Privacy Agreement to continue.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">VESTRA ESTATES - PRIVACY AGREEMENT</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-6 flex-1 overflow-y-auto text-gray-300 space-y-4 text-sm">
                        <p><strong>Effective Date: {effectiveDate}</strong></p>
                        
                        <h3 className="text-lg font-semibold text-white pt-2">1. Introduction</h3>
                        <p>Vestra Estates ("we", "our") attaches the utmost importance to the privacy of all users who visit our platform ("Platform"), which is accessible only by prior approval and invitation, apply for membership ("Prospective Member"), and have their membership approved ("Member"). This Privacy Agreement explains what personal data Vestra Estates collects and for what purposes, how it is used, with whom it may be shared, how it ensures data security, and the rights of data owners.</p>
                        
                        <h3 className="text-lg font-semibold text-white pt-2">2. Personal Data Collected</h3>
                        <p>Due to the privileged nature of our platform, we may collect the following types of personal data to ensure the quality and security of the services we offer:</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><strong>Data Collected from Prospective Members (Application and Pre-Approval Process):</strong> Identity Information (First name, last name, ID number/passport number), Contact Information (Email address, phone number, residential address), Financial Information (Income status, declarations of assets, documents confirming investment capacity), Professional Information (Profession, title, institution, work experience), Reference Information (Contact information of reference persons specified during the application process).</li>
                            <li><strong>Data Collected from Members (During Membership):</strong> In addition to all the information mentioned above: Transaction Information (Property search preferences, favorite lists, offers made, and completed purchase and sale transactions), Communication Records, Technical Data (IP address, device information, browser type, cookies).</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-white pt-2">3. Purposes of Processing Personal Data</h3>
                        <p>Your personal data is processed for purposes including, but not limited to: receiving and finalizing membership applications, verifying identity, providing our exclusive real estate services, personalizing recommendations, performing financial transactions, and fulfilling legal obligations.</p>
                        
                        <h3 className="text-lg font-semibold text-white pt-2">4. Transfer of Personal Data</h3>
                        <p>Your personal data is protected by the principle of absolute confidentiality and will not be shared with third parties except with our business partners (under confidentiality agreements), parties to a real estate transaction, or as required by legal obligations.</p>

                        <h3 className="text-lg font-semibold text-white pt-2">5. Data Security</h3>
                        <p>The security of your data is our top priority. We implement industry-standard technical and administrative security measures, including Secure Socket Layer (SSL) technology, encryption, and access control procedures to protect your personal data.</p>
                        
                        <h3 className="text-lg font-semibold text-white pt-2">6. Data Subject Rights</h3>
                        <p>In accordance with relevant legislation, you have rights regarding your personal data, including the right to access, request information, request correction, and request deletion of your data. To exercise these rights, contact us at legal@vestra.com.</p>
                        
                        <h3 className="text-lg font-semibold text-white pt-2">7. Cookie Policy & Changes</h3>
                        <p>Our platform uses cookies to improve the user experience. We reserve the right to update this Privacy Agreement at any time, and significant changes will be notified to our members.</p>
                        
                        <h3 className="text-lg font-semibold text-white pt-2">9. Contact</h3>
                        <p>
                            VESTRA ESTATES AG<br/>
                            Bahnhofstrasse 100, 8001 Zürich, Switzerland<br/>
                            legal@vestra.com<br/>
                            +41 44 123 45 67
                        </p>
                    </div>

                    <div className="flex-shrink-0 p-6 border-t border-gray-800 space-y-4 bg-[#0c0c10]">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <label className="block font-medium text-gray-400">Name and Surname:</label>
                                <p className="text-gray-200 font-mono p-2 border-b border-gray-700">{user.name}</p>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-400">Date:</label>
                                <p className="text-gray-200 font-mono p-2 border-b border-gray-700">{effectiveDate}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <input
                                id="agreement"
                                type="checkbox"
                                checked={consentGiven}
                                onChange={(e) => setConsentGiven(e.target.checked)}
                                className="h-4 w-4 mt-1 bg-gray-800 border-gray-600 rounded text-cyan-500 focus:ring-cyan-500"
                            />
                            <label htmlFor="agreement" className="ml-2 block text-sm text-gray-300">
                                I hereby confirm that I have read, understood, and agree to the terms of the VESTRA ESTATES Privacy Agreement.
                            </label>
                        </div>
                    </div>

                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Decline</Button>
                        <Button variant="primary" type="submit" disabled={!consentGiven}>
                            Approve and Continue
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PrivacyAgreementModal;
