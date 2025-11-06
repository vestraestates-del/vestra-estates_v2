

import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/EliteIcons.tsx';
import Button from './ui/Button.tsx';

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
            // Convert arrays to newline-separated strings for text areas
            const processedItem = Object.entries(item).reduce((acc, [key, value]) => {
                if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
                    acc[key] = value.join('\n');
                } else if (key === 'stats' && Array.isArray(value)) {
                     acc[key] = value.map((obj: { label: string, value: string }) => `${obj.label}:${obj.value}`).join('\n');
                }
                else {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, any>);
            setFormData(processedItem);
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
        // Convert newline-separated strings back to arrays before saving
        const finalData = Object.entries(formData).reduce((acc, [key, value]) => {
            const originalValue = item ? item[key] : undefined;
             if (typeof value === 'string' && (key === 'gallery' || key === 'videos' || key === 'featureKeys')) {
                acc[key] = value.split('\n').filter(line => line.trim() !== '');
            } else if (typeof value === 'string' && key === 'stats') {
                 acc[key] = value.split('\n').filter(line => line.trim() !== '').map(line => {
                    const [label, val] = line.split(':');
                    return { label: label?.trim(), value: val?.trim() };
                });
            }
            else {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);
        onSave(finalData);
    };

    const renderField = (key: string, value: any) => {
        if (key === 'id' || key === 'assetType') return null; // Don't show ID or assetType field

        const fieldType = typeof value;
        
        if (Array.isArray(item?.[key]) || key === 'featureKeys' || key === 'stats') {
             return (
                 <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-400 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <textarea
                        id={key}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-xs"
                        placeholder={key === 'stats' ? "label:value (one per line)" : "one URL per line"}
                    />
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

        const isTextArea = typeof item?.[key] === 'string' && item[key].length > 100 || key.toLowerCase().includes('description') || key.toLowerCase().includes('features') || key.toLowerCase().includes('teaser');

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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
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