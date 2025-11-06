
import React, { useState } from 'react';
import PortfolioWidget from './widgets/PortfolioWidget';
import PropertyValueWidget from './widgets/PropertyValueWidget';
import AgendaWidget from './widgets/AgendaWidget';
import RequestsWidget from './widgets/RequestsWidget';
import AIEvaluationWidget from './widgets/AIEvaluationWidget';
import CollectionFlowWidget from './widgets/CollectionFlowWidget';
import PromotionsBanner from './PromotionsBanner';
import type { PortfolioItem } from '../data/portfolioData';
// FIX: Add file extension to appData import
import type { AgendaItem, RequestItem } from '../data/appData.ts';
import { useLocalization } from '../localization/LocalizationContext';

interface DashboardProps {
  portfolioItems: PortfolioItem[];
  onOpenPropertyDetail: (property: PortfolioItem) => void;
  agendaItems: AgendaItem[];
  onToggleComplete: (id: number) => void;
  onSaveAgenda: (item: AgendaItem) => void;
  onDeleteAgenda: (id: number) => void;
  requestItems: RequestItem[];
  userType: 'user' | 'admin';
  onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
  onUpdateRequest: (id: number, newStatus: RequestItem['status']) => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { t } = useLocalization();
  const [selectedProperty, setSelectedProperty] = useState<PortfolioItem | null>(props.portfolioItems[0] || null);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t('sidebar.dashboard')}</h1>
        <p className="text-gray-400">Welcome to your secure client portal.</p>
      </header>

      {showBanner && (
        <PromotionsBanner 
          title="Exclusive Opportunity: The Athena District"
          description="A new joint venture opportunity is available for co-investment in NEOM. View the prospectus in the Joint Ventures section."
          onDismiss={() => setShowBanner(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <PortfolioWidget 
            portfolioItems={props.portfolioItems} 
            onSelectProperty={setSelectedProperty} 
            selectedProperty={selectedProperty}
            onOpenPropertyDetail={props.onOpenPropertyDetail}
          />
          <PropertyValueWidget />
          <AIEvaluationWidget property={selectedProperty} />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <AgendaWidget 
            items={props.agendaItems} 
            onToggleComplete={props.onToggleComplete}
            onSave={props.onSaveAgenda}
            onDelete={props.onDeleteAgenda}
          />
          <RequestsWidget 
            items={props.requestItems} 
            userType={props.userType}
            onAddRequest={props.onAddRequest}
            onUpdateRequest={props.onUpdateRequest}
          />
          <CollectionFlowWidget portfolioItems={props.portfolioItems} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
