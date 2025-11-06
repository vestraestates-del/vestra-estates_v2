import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../../icons/EliteIcons';
import Button from '../../ui/Button';
import { MembershipPlan } from './Finance';

interface PlanEditorModalProps {
    plan: MembershipPlan;
    onClose: () => void;
    onSave: (plan: MembershipPlan) => void;
}

const PlanEditorModal: React.FC<PlanEditorModalProps> = ({ plan, onClose, onSave }) => {
    const [editedPlan, setEditedPlan] = useState(plan);

    useEffect(() => {
        setEditedPlan(plan);
    }, [plan]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setEditedPlan(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedPlan);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Edit Membership Plan: {plan.name}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Plan Name</label>
                            <input
                                type="text"
                                value={editedPlan.name}
                                disabled
                                className="w-full bg-gray-800 border-gray-700 rounded-md px-3 py-2 text-gray-400 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">Price</label>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                value={editedPlan.price}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="features" className="block text-sm font-medium text-gray-400 mb-1">Number of Features</label>
                            <input
                                id="features"
                                name="features"
                                type="number"
                                value={editedPlan.features}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Plan</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlanEditorModal;
