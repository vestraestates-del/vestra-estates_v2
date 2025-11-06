
import React, { useState } from 'react';
import WidgetCard from '../ui/WidgetCard';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import AgendaItemModal from '../AgendaItemModal';
import { ClockIcon, PlusCircleIcon, EditIcon, TrashIcon, InformationCircleIcon } from '../icons/EliteIcons';
// FIX: Added file extension to appData import
import { AgendaItem } from '../../data/appData.ts';

interface AgendaWidgetProps {
  items: AgendaItem[];
  onToggleComplete: (id: number) => void;
  onSave: (item: AgendaItem) => void;
  onDelete: (id: number) => void;
}

const getPriorityColor = (priority?: 'High' | 'Medium' | 'Low') => {
  switch (priority) {
    case 'High': return 'bg-red-500';
    case 'Medium': return 'bg-yellow-500';
    case 'Low': return 'bg-cyan-500';
    default: return 'bg-transparent';
  }
};

const AgendaWidget: React.FC<AgendaWidgetProps> = ({ items, onToggleComplete, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<AgendaItem | null>(null);

  const handleOpenModal = (item?: AgendaItem) => {
    setCurrentItem(item || null);
    setIsModalOpen(true);
  };
  
  const handleSaveItem = (item: AgendaItem) => {
    onSave(item);
    setIsModalOpen(false);
  };

  return (
    <>
      <WidgetCard title="Today's Agenda" actionIcon={<ClockIcon className="w-4 h-4" />}>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-start group relative pl-3">
              <div className={`absolute left-0 top-1 bottom-1 w-1 rounded-full ${getPriorityColor(item.priority)}`}></div>
              <div className="text-xs text-gray-400 font-mono w-12 text-right pt-1">{item.time}</div>
              <div className="flex-1 border-l border-gray-700 pl-3 flex items-center gap-2">
                <Checkbox 
                  checked={item.completed} 
                  onChange={() => onToggleComplete(item.id)}
                  label=""
                  aria-label={`Mark '${item.title}' as complete`}
                />
                <div className="flex-1">
                  <p className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{item.title}</p>
                  <p className={`text-xs ${item.completed ? 'text-gray-600 line-through' : 'text-gray-500'}`}>{item.location}</p>
                </div>
                 <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.notes && (
                      <div className="p-1 text-gray-500" title={item.notes}>
                        <InformationCircleIcon className="w-4 h-4" />
                      </div>
                    )}
                    <button onClick={() => handleOpenModal(item)} className="p-1 text-gray-500 hover:text-cyan-400"><EditIcon className="w-3.5 h-3.5" /></button>
                    <button onClick={() => onDelete(item.id)} className="p-1 text-gray-500 hover:text-red-400"><TrashIcon className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800">
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-2" onClick={() => handleOpenModal()}>
                <PlusCircleIcon className="w-4 h-4" />
                Add Task
            </Button>
        </div>
      </WidgetCard>
      {isModalOpen && (
        <AgendaItemModal
            item={currentItem}
            onSave={handleSaveItem}
            onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default AgendaWidget;