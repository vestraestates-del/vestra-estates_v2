import React, { useState, lazy, Suspense } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';

const IntegrationSettingsModal = lazy(() => import('./IntegrationSettingsModal'));

export interface Integration {
    name: string;
    category: string;
    connected: boolean;
    apiKey?: string;
}

const initialIntegrations: Integration[] = [
    { name: 'Stripe', category: 'Payments', connected: true, apiKey: 'sk_live_********************' },
    { name: 'Twilio', category: 'SMS/Email', connected: false, apiKey: '' },
    { name: 'Google Analytics', category: 'Analytics', connected: true, apiKey: 'G-**********' },
    { name: 'Meta Conversion API', category: 'Analytics', connected: false, apiKey: '' },
    { name: 'Google Gemini', category: 'AI Services', connected: true, apiKey: 'AIzaSy********************' },
    { name: 'Mapbox', category: 'Maps', connected: false, apiKey: '' },
];

const Integrations: React.FC = () => {
    const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
    const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);

    const handleSave = (updatedIntegration: Integration) => {
        setIntegrations(prev => prev.map(i => i.name === updatedIntegration.name ? updatedIntegration : i));
        setEditingIntegration(null);
    };

    return (
        <>
            <div>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Integrations</h1>
                    <p className="text-gray-400">Manage connections with third-party services.</p>
                </header>
                <WidgetCard title="Connected Services">
                    <div className="space-y-4">
                        {integrations.map(int => (
                            <div key={int.name} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div>
                                    <p className="font-semibold text-white">{int.name}</p>
                                    <p className="text-xs text-gray-400">{int.category}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`text-sm font-semibold ${int.connected ? 'text-green-400' : 'text-gray-500'}`}>
                                        {int.connected ? 'Connected' : 'Disconnected'}
                                    </div>
                                    <Button size="sm" variant="secondary" onClick={() => setEditingIntegration(int)}>Settings</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </WidgetCard>
            </div>
            <Suspense fallback={null}>
                {editingIntegration && (
                    <IntegrationSettingsModal
                        integration={editingIntegration}
                        onClose={() => setEditingIntegration(null)}
                        onSave={handleSave}
                    />
                )}
            </Suspense>
        </>
    );
};

export default Integrations;
