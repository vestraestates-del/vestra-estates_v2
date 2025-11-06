import React, { useState } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';
import { initialRequestItems, RequestItem } from '../../../data/appData';
import { SearchIcon, EditIcon, PlusCircleIcon } from '../../icons/EliteIcons';
import ServiceRequestModal from './ServiceRequestModal';

const ServiceDesk: React.FC = () => {
    const [requests, setRequests] = useState<RequestItem[]>(initialRequestItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRequest, setEditingRequest] = useState<Partial<RequestItem> | null>(null);

    const handleOpenModal = (request?: RequestItem) => {
        setEditingRequest(request || null);
        setIsModalOpen(true);
    };

    const handleSaveRequest = (requestToSave: RequestItem) => {
        if (requestToSave.id && requests.some(r => r.id === requestToSave.id)) {
            setRequests(requests.map(r => r.id === requestToSave.id ? requestToSave : r));
        } else {
            setRequests(prev => [...prev, { ...requestToSave, id: Date.now() }]);
        }
        setIsModalOpen(false);
        setEditingRequest(null);
    };
    
    const getStatusClasses = (status: RequestItem['status']) => {
        switch (status) {
            case 'Urgent': return 'text-red-400';
            case 'Pending': return 'text-yellow-400';
            case 'In Progress': return 'text-blue-400';
            case 'Completed': return 'text-green-400';
            default: return 'text-gray-400';
        }
    }

    return (
        <div>
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Service Desk</h1>
                    <p className="text-gray-400">Manage all incoming member service requests.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                    <PlusCircleIcon className="w-5 h-5"/> New Request
                </Button>
            </header>
            <WidgetCard title="All Requests">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input type="text" placeholder="Search requests..." className="bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Requester</th>
                                <th scope="col" className="px-6 py-3">Assignee</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req.id} className="border-b border-gray-800 hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">{req.title}</td>
                                    <td className="px-6 py-4">{req.requester}</td>
                                    <td className="px-6 py-4">{req.assignee}</td>
                                    <td className={`px-6 py-4 font-semibold ${getStatusClasses(req.status)}`}>{req.status}</td>
                                    <td className="px-6 py-4">
                                        <Button size="sm" onClick={() => handleOpenModal(req)} className="flex items-center gap-2">
                                            <EditIcon className="w-4 h-4" />
                                            Manage
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WidgetCard>
            {isModalOpen && <ServiceRequestModal request={editingRequest} onClose={() => setIsModalOpen(false)} onSave={handleSaveRequest} />}
        </div>
    );
};

export default ServiceDesk;
