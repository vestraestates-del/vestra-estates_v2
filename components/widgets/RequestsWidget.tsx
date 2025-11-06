
import React, { useState } from 'react';
import WidgetCard from '../ui/WidgetCard';
import { NotificationIcon, PlusCircleIcon, InformationCircleIcon } from '../icons/EliteIcons';
// FIX: Added file extension to appData import
import type { RequestItem } from '../../data/appData.ts';
import Button from '../ui/Button';
import RequestModal from '../RequestModal';

interface RequestsWidgetProps {
  items: RequestItem[];
  userType: 'user' | 'admin';
  onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
  onUpdateRequest: (id: number, newStatus: RequestItem['status']) => void;
}

const getStatusClasses = (status: RequestItem['status']) => {
  switch (status) {
    case 'Urgent': return { dot: 'bg-red-500', text: 'text-red-400' };
    case 'Pending': return { dot: 'bg-yellow-500', text: 'text-yellow-400' };
    case 'In Progress': return { dot: 'bg-blue-500', text: 'text-blue-400' };
    case 'Completed': return { dot: 'bg-green-500', text: 'text-green-400' };
    default: return { dot: 'bg-gray-500', text: 'text-gray-400' };
  }
}

const StatusPill: React.FC<{ status: RequestItem['status'] }> = ({ status }) => {
    const { dot, text } = getStatusClasses(status);
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dot}`}></div>
            <span className={`text-xs font-semibold ${text}`}>{status}</span>
        </div>
    );
};

const RequestsWidget: React.FC<RequestsWidgetProps> = ({ items, userType, onAddRequest, onUpdateRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <WidgetCard title="Pending Requests" actionIcon={<NotificationIcon className="w-4 h-4" />}>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
              <div className="flex-grow">
                <p className="text-sm text-gray-200">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {item.requester && <><span className="font-semibold text-gray-400">From:</span> {item.requester} | </>}
                  <span className="font-semibold text-gray-400">To:</span> {item.assignee}
                </p>
              </div>
              {item.details && (
                <div className="p-1 text-gray-500" title={item.details}>
                    <InformationCircleIcon className="w-4 h-4" />
                </div>
              )}
              {userType === 'admin' ? (
                 <select
                    value={item.status}
                    onChange={(e) => onUpdateRequest(item.id, e.target.value as RequestItem['status'])}
                    className={`text-xs font-semibold bg-transparent border-0 rounded-md focus:ring-0 appearance-none ${getStatusClasses(item.status).text}`}
                 >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Completed">Completed</option>
                 </select>
              ) : (
                <StatusPill status={item.status} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800">
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-2" onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="w-4 h-4" />
                New Request
            </Button>
        </div>
      </WidgetCard>
      {isModalOpen && (
        <RequestModal 
            onSave={onAddRequest}
            onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default RequestsWidget;
