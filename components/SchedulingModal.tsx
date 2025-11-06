import React, { useState } from 'react';
import type { PortfolioItem } from '../data/portfolioData';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';

interface SchedulingModalProps {
    property: PortfolioItem;
    onSchedule: (date: string, time: string) => void;
    onClose: () => void;
}

const SchedulingModal: React.FC<SchedulingModalProps> = ({ property, onSchedule, onClose }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const { t } = useLocalization();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !time) {
            alert("Please select both a date and a time for the viewing.");
            return;
        }
        onSchedule(date, time);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Schedule Viewing</h2>
                        <p className="text-sm text-gray-400">{t(property.nameKey)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                         <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">Select a Date</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                style={{ colorScheme: 'dark' }}
                            />
                        </div>
                         <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-1">Select a Time</label>
                            <input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                style={{ colorScheme: 'dark' }}
                            />
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Confirm Appointment</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SchedulingModal;