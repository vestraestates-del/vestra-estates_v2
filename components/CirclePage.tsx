import React, { useState, useMemo } from 'react';
// FIX: Removed UserTier from this import as it's not exported from circleData.ts.
import type { CircleMember } from '../data/circleData.ts';
import { BriefcaseIcon, HeartIcon, MessageIcon, UsersGroupIcon, SearchIcon, PlusCircleIcon } from './icons/EliteIcons.tsx';
// FIX: Added UserTier to this import, as it is correctly exported from App.tsx.
import type { User, UserTier } from '../App.tsx';
import type { RequestItem } from '../data/appData.ts';
import Button from './ui/Button.tsx';

interface CirclePageProps {
  user: User;
  members: CircleMember[];
  onOpenChat: (member: CircleMember) => void;
  unreadMessages: Record<number, number>;
  onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
  onNominate: () => void;
}

const CirclePage: React.FC<CirclePageProps> = ({ user, members, onOpenChat, unreadMessages, onAddRequest, onNominate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tierFilter, setTierFilter] = useState<UserTier | 'All'>('All');
    
    const allInterests = useMemo(() => {
        const interests = new Set<string>();
        members.forEach(member => member.interests.forEach(interest => interests.add(interest)));
        return Array.from(interests).sort();
    }, [members]);

    const [interestFilter, setInterestFilter] = useState<string>('All');

    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            const matchesSearch = searchTerm === '' ||
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.title.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesTier = tierFilter === 'All' || member.tier === tierFilter;
            
            const matchesInterest = interestFilter === 'All' || member.interests.includes(interestFilter);

            return matchesSearch && matchesTier && matchesInterest;
        });
    }, [members, searchTerm, tierFilter, interestFilter]);

    const handleRequestIntroduction = (member: CircleMember) => {
        onAddRequest({
            type: 'Action',
            title: `Introduction Request: ${user.name} to ${member.name}`,
            assignee: 'C. Blackwood', // Senior Partner / Concierge
            status: 'Pending',
            details: `Facilitate a formal introduction between ${user.name} and ${member.name} of ${member.company}.`
        });
        alert(`Your request for an introduction to ${member.name} has been sent. Your concierge will be in touch to coordinate.`);
    };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">The Circle</h1>
            <p className="text-gray-400">Your private network of global leaders and visionaries.</p>
        </div>
        <Button onClick={onNominate} className="flex items-center gap-2 self-start md:self-auto">
            <PlusCircleIcon className="w-5 h-5" />
            Nominate a New Member
        </Button>
      </header>

      {/* Filters */}
       <div className="mb-8 p-4 bg-black/50 border border-white/10 rounded-xl backdrop-blur-xl shadow-lg space-y-4">
            <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by name, company, title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-full pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500"
                />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select value={tierFilter} onChange={e => setTierFilter(e.target.value as any)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300">
                    <option value="All">All Membership Tiers</option>
                    <option value="Elit Access">Elit Access</option>
                    <option value="Diamond Access">Diamond Access</option>
                    <option value="Royal Black Access">Royal Black Access</option>
                </select>
                <select value={interestFilter} onChange={e => setInterestFilter(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300">
                    <option value="All">All Interests</option>
                    {allInterests.map(interest => <option key={interest} value={interest}>{interest}</option>)}
                </select>
            </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map(member => {
          const unreadCount = unreadMessages[member.id] || 0;
          return (
            <div key={member.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-500/30">
              <div className="relative mb-4">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full border-4 border-gray-700" />
                {member.online && <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-[#111116] rounded-full" title="Online"></div>}
              </div>
              <h2 className="text-xl font-semibold text-white">{member.name}</h2>
              <p className="text-sm text-cyan-400">{member.title}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <BriefcaseIcon className="w-3 h-3" />
                <span>{member.company}</span>
              </div>

              <div className="border-t border-gray-800 w-full my-6"></div>

              <div className="text-left w-full">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <HeartIcon className="w-4 h-4 text-gray-500" />
                    <h3 className="font-semibold">Interests</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.interests.map(interest => (
                    <span key={interest} className="bg-gray-700/50 text-gray-300 text-xs px-2.5 py-1 rounded-full">{interest}</span>
                  ))}
                </div>
              </div>
              
               <div className="mt-6 w-full space-y-2">
                    <Button onClick={() => handleRequestIntroduction(member)} variant="secondary" className="w-full flex items-center justify-center gap-2">
                        <UsersGroupIcon className="w-4 h-4" />
                        <span>Request Introduction</span>
                    </Button>
                    <Button onClick={() => onOpenChat(member)} className="relative w-full flex items-center justify-center gap-2">
                        <MessageIcon className="w-4 h-4" />
                        <span>Secure Message</span>
                        {unreadCount > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#111116]">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </div>
                        )}
                    </Button>
               </div>
            </div>
          )
        })}
      </div>
      {filteredMembers.length === 0 && (
        <div className="text-center py-16 text-gray-500">
            <p>No members match the current filters.</p>
        </div>
      )}
    </div>
  );
};

export default CirclePage;