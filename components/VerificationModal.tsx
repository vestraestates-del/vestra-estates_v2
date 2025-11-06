import React, { useState } from 'react';
import { CloseIcon, ShieldCheckIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import FileUpload from './FileUpload';

interface VerificationModalProps {
    onClose: () => void;
    onVerified: () => void;
    selectedTier: string;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ onClose, onVerified, selectedTier }) => {
    const [step, setStep] = useState(1);
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const [financialsFile, setFinancialsFile] = useState<File | null>(null);

    const canProceedToStep2 = passportFile !== null && financialsFile !== null;
    
    const handleFinalSubmit = () => {
        // In a real app, this would trigger a secure backend process
        console.log(`Submitting application for ${selectedTier}:`, { passportFile, financialsFile });
        onVerified();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Identity & Financial Verification</h2>
                        <p className="text-sm text-gray-400">Application for <span className="font-semibold text-cyan-400">{selectedTier}</span> membership.</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'}`}>1</div>
                            <div className={`w-24 h-1 ${step > 1 ? 'bg-cyan-500' : 'bg-gray-700'}`}></div>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'}`}>2</div>
                        </div>
                    </div>
                    
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-center text-gray-200">Document Upload</h3>
                             <p className="text-sm text-center text-gray-400 -mt-4">Please provide the following documents for verification. All data is encrypted and handled with utmost confidentiality.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <FileUpload 
                                    label="Passport or National ID"
                                    onFileSelect={setPassportFile}
                                    acceptedTypes="image/jpeg, image/png, application/pdf"
                                />
                                <FileUpload 
                                    label="Proof of Financial Standing"
                                    onFileSelect={setFinancialsFile}
                                    acceptedTypes="application/pdf"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                         <div className="text-center animate-fade-in">
                            <ShieldCheckIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-200">Final Confirmation</h3>
                            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                                You have uploaded <span className="font-semibold text-cyan-400">{passportFile?.name}</span> and <span className="font-semibold text-cyan-400">{financialsFile?.name}</span>.
                                By submitting, you confirm these documents are accurate and consent to our verification process.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-between items-center">
                    {step === 2 && (
                        <Button variant="secondary" onClick={() => setStep(1)}>
                            Back
                        </Button>
                    )}
                    <div/>
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        {step === 1 && (
                            <Button variant="primary" onClick={() => setStep(2)} disabled={!canProceedToStep2}>
                                Review & Confirm
                            </Button>
                        )}
                         {step === 2 && (
                            <Button variant="primary" onClick={handleFinalSubmit} className="bg-green-600 hover:bg-green-700 focus:ring-green-500">
                                Submit for Verification
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationModal;