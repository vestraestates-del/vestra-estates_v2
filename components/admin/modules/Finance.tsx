import React, { useState, lazy, Suspense } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';

const PlanEditorModal = lazy(() => import('./PlanEditorModal'));

export interface MembershipPlan {
    name: string;
    price: string;
    features: number;
}

const initialPlans: MembershipPlan[] = [
    { name: 'Elit Access', price: 'By Invitation', features: 5 },
    { name: 'Diamond Access', price: 'Price on Application', features: 8 },
    { name: 'Royal Black Access', price: 'By Nomination', features: 12 },
];

const payments = [
    { id: 'pay_1', user: 'Adrian Roth', amount: '$50,000', date: '2024-07-01', status: 'Succeeded' },
    { id: 'pay_2', user: 'Isabella Rossi', amount: '$25,000', date: '2024-07-01', status: 'Succeeded' },
];

const Finance: React.FC = () => {
    const [plans, setPlans] = useState<MembershipPlan[]>(initialPlans);
    const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);

    const handleSavePlan = (updatedPlan: MembershipPlan) => {
        setPlans(prev => prev.map(p => p.name === updatedPlan.name ? updatedPlan : p));
        setEditingPlan(null);
    };

    return (
        <>
            <div>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Finance & Payments</h1>
                    <p className="text-gray-400">Manage membership plans and view payment history.</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {plans.map(plan => (
                        <WidgetCard key={plan.name} title={plan.name}>
                            <p className="text-2xl font-bold text-white">{plan.price}</p>
                            <p className="text-sm text-gray-400">{plan.features} Features</p>
                            <Button size="sm" variant="secondary" className="mt-4" onClick={() => setEditingPlan(plan)}>Edit Plan</Button>
                        </WidgetCard>
                    ))}
                </div>
                <WidgetCard title="Payment History">
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-400 uppercase bg-white/5">
                                <tr>
                                    <th className="px-6 py-3">Transaction ID</th>
                                    <th className="px-6 py-3">User</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(p => (
                                    <tr key={p.id} className="border-b border-gray-800 hover:bg-white/5">
                                        <td className="px-6 py-4 font-mono text-white">{p.id}</td>
                                        <td className="px-6 py-4">{p.user}</td>
                                        <td className="px-6 py-4">{p.amount}</td>
                                        <td className="px-6 py-4">{p.date}</td>
                                        <td className="px-6 py-4 text-green-400">{p.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </WidgetCard>
            </div>
            <Suspense fallback={null}>
                {editingPlan && (
                    <PlanEditorModal
                        plan={editingPlan}
                        onClose={() => setEditingPlan(null)}
                        onSave={handleSavePlan}
                    />
                )}
            </Suspense>
        </>
    );
};

export default Finance;
