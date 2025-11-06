
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';

interface AdminFormModalProps {
    item: Record<string, any> | null;
    onSave: (item: Record<string, any>) => void;
    onClose: () => void;
    title: string;
}

const AdminFormModal: React.FC<AdminFormModalProps> = ({ item, onSave, onClose, title }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({}); // Reset for new item creation
        }
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const isChecked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: isCheckbox ? isChecked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const renderField = (key: string, value: any) => {
        if (key === 'id') return null; // Don't show ID field

        const fieldType = typeof value;
        const isStatsArray = (val: any) => Array.isArray(val) && val.every(v => v && typeof v.label === 'string' && typeof v.value === 'string');

        if (key === 'stats' || (Array.isArray(value) && value.every(v => typeof v === 'object' && v !== null && 'label' in v && 'value' in v))) {
            const stringValue = isStatsArray(formData[key]) 
                ? formData[key].map((obj: { label: string, value: string }) => `${obj.label}:${obj.value}`).join('\n') 
                : (formData[key] || '');

            return (
                 <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-400 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <textarea
                        id={key}
                        name={key}
                        value={stringValue}
                        onChange={(e) => setFormData(prev => ({...prev, [key]: e.target.value}))}
                        rows={4}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-xs"
                        placeholder="label:value"
                    />
                     <p className="text-xs text-gray-500 mt-1">Enter as key:value pairs, one per line.</p>
                </div>
            )
        }

        if (fieldType === 'boolean') {
            return (
                <div key={key} className="flex items-center">
                    <input
                        id={key}
                        name={key}
                        type="checkbox"
                        checked={!!formData[key]}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor={key} className="ml-2 block text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                </div>
            );
        }

        const isTextArea = key.toLowerCase().includes('description') || key.toLowerCase().includes('features') || key.toLowerCase().includes('teaser');

        return (
            <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-400 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                {isTextArea ? (
                    <textarea
                        id={key}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                ) : (
                    <input
                        id={key}
                        name={key}
                        type={fieldType === 'number' ? 'number' : 'text'}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                        {Object.entries(item || formData).map(([key, value]) => renderField(key, value))}
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminFormModal;
