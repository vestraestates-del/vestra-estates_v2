import React, { useState } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';
import { User } from '../App';

interface PrivateDeskRequestModalProps {
    isOpen: boolean;
    requestType: string;
    user: User;
    onClose: () => void;
    onSave: (details: string) => void;
}

const PrivateDeskRequestModal: React.FC<PrivateDeskRequestModalProps> = ({ isOpen, requestType, user, onClose, onSave }) => {
    const { t, language } = useLocalization();
    const [country, setCountry] = useState('');
    const [entityLevel, setEntityLevel] = useState('tier1');
    const [message, setMessage] = useState('');
    
    // State for the new NDA consent form
    const [ndaConsentGiven, setNdaConsentGiven] = useState(false);

    const [firstName, ...lastNameParts] = user.name.split(' ');
    const lastName = lastNameParts.join(' ');

    const isNdaRequest = requestType === 'nda';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isNdaRequest) {
            if (!ndaConsentGiven) {
                alert("You must agree to the terms to proceed.");
                return;
            }
            const details = `
                Request Type: Vestra Estates - Privacy Agreement Pre-approval
                Consent Given: Yes
                User Name: ${user.name}
                Date of Consent: ${new Date().toLocaleDateString(language)}
            `;
            onSave(details.trim());
        } else {
            const details = `
                Request Type: ${t(`privateDesk.requestItems.${requestType}`)}
                Name: ${firstName}
                Surname: ${lastName}
                Country: ${country}
                Entity Level: ${t(`privateDesk.form.entityLevels.${entityLevel}`)}
                Message: ${message || 'No message provided.'}
            `;
            onSave(details.trim());
        }
    };

    if (!isOpen) return null;
    
    const renderNdaForm = () => (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <h3 className="text-center font-semibold text-white">Vestra Estates - Privacy Agreement Pre-approval Form</h3>
                <p className="text-center text-sm text-gray-400">
                    <strong>Subject:</strong> Declaration of Consent for the Processing of Personal Data within the Scope of the Vestra Estates Privileged Membership Application
                </p>

                <div className="mt-4 p-4 bg-gray-900/50 border border-gray-700 rounded-md text-sm text-gray-300 space-y-3 max-h-60 overflow-y-auto">
                    <p>Vestra Estates is a private real estate platform serving only select members who have successfully completed the invitation and pre-approval processes. Your personal and sensitive personal data, provided by you, must be processed in order for your membership application to be evaluated.</p>
                    <p>Before proceeding with the application process, it is essential that you carefully read and understand the Vestra Estates Privacy Agreement, which explains in detail how your personal data will be collected, for what purposes it will be used, with whom it may be shared, and your rights in this regard.</p>
                    
                    <h4 className="font-semibold text-gray-200 pt-2">Key Principles of Our Privacy Agreement:</h4>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        <li><strong>Data Collection:</strong> Personal data such as identity, contact information, financial status, professional experience, and reference information will be requested for the evaluation of your membership application.</li>
                        <li><strong>Purpose of Processing:</strong> This data will be processed under high confidentiality standards solely for the purposes of determining your eligibility for Vestra Estates membership, evaluating your application, preventing fraud, and communicating with you.</li>
                        <li><strong>Data Security:</strong> All information you entrust to us is protected by state-of-the-art technical and administrative security measures and secured against unauthorized access.</li>
                        <li><strong>Data Sharing:</strong> Your personal data will not be shared with third parties without your explicit consent, except as required by legal obligations or to verify your application. All our business partners with whom we share data are obligated to adhere to the same confidentiality standards.</li>
                        <li><strong>Your Rights:</strong> As a data subject, you have the legal rights to access your personal data, request its correction, request its erasure, and object to its processing. How to exercise these rights is detailed in the Privacy Policy.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h4 className="font-semibold text-gray-200">Declaration of Consent:</h4>
                    <p className="text-sm text-gray-300 mt-1">
                        By checking the box below, I acknowledge and declare that I have read and understand the Vestra Estates Privacy Policy and that I freely and openly consent to the collection, processing, and, if necessary, transfer of my personal data to limited third parties for verification purposes, under the terms set forth in this policy, for the purpose of evaluating my membership application.
                    </p>
                </div>

                <div className="flex items-start mt-4">
                    <input
                        id="ndaConsent" type="checkbox" checked={ndaConsentGiven} onChange={(e) => setNdaConsentGiven(e.target.checked)}
                        className="h-4 w-4 mt-1 bg-gray-800 border-gray-600 rounded text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="ndaConsent" className="ml-2 block text-sm text-gray-300">I have read, understood, and agree.</label>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                        <label className="block font-medium text-gray-400">Name and Surname:</label>
                        <p className="text-gray-200 font-mono p-2 border-b border-gray-700">{user.name}</p>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-400">Date:</label>
                        <p className="text-gray-200 font-mono p-2 border-b border-gray-700">{new Date().toLocaleDateString(language)}</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">This pre-approval form is an integral part of the Vestra Estates membership application process. The application process cannot proceed without this consent.</p>
            </div>
            <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={!ndaConsentGiven}>{t('privateDesk.form.submit')}</Button>
            </div>
        </form>
    );

    const renderDefaultForm = () => (
         <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">{t('privateDesk.form.name')}</label>
                        <input
                            id="name" type="text" value={firstName} disabled
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-400 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-400 mb-1">{t('privateDesk.form.surname')}</label>
                        <input
                            id="surname" type="text" value={lastName} disabled
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-400 cursor-not-allowed"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-1">{t('privateDesk.form.country')}</label>
                    <input
                        id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                 <div>
                    <label htmlFor="entityLevel" className="block text-sm font-medium text-gray-400 mb-1">{t('privateDesk.form.entityLevel')}</label>
                    <select
                        id="entityLevel" value={entityLevel} onChange={(e) => setEntityLevel(e.target.value)} required
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="tier1">{t('privateDesk.form.entityLevels.tier1')}</option>
                        <option value="tier2">{t('privateDesk.form.entityLevels.tier2')}</option>
                        <option value="tier3">{t('privateDesk.form.entityLevels.tier3')}</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">{t('privateDesk.form.message')}</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        placeholder={t('privateDesk.form.messagePlaceholder')}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
            </div>
            <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                <Button variant="primary" type="submit">{t('privateDesk.form.submit')}</Button>
            </div>
        </form>
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className={`bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full ${isNdaRequest ? 'max-w-2xl' : 'max-w-lg'} flex flex-col`} onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">{t('privateDesk.modalTitle')}</h2>
                        <p className="text-sm text-gray-400">{t(`privateDesk.requestItems.${requestType}`)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                {isNdaRequest ? renderNdaForm() : renderDefaultForm()}
            </div>
        </div>
    );
};

export default PrivateDeskRequestModal;