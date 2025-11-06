import React from 'react';
import type { CircleMember } from '../data/circleData';
import { BriefcaseIcon, HeartIcon, MessageIcon } from './icons/EliteIcons';

interface CirclePageProps {
  members: CircleMember[];
  onOpenChat: (member: CircleMember) => void;
  unreadMessages: Record<number, number>;
}

const CirclePage: React.FC<CirclePageProps> = ({ members, onOpenChat, unreadMessages }) => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">The Circle</h1>
        <p className="text-gray-400">Your private network of global leaders and visionaries.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map(member => {
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
              
              <button 
                onClick={() => onOpenChat(member)}
                className="relative mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                  <MessageIcon className="w-4 h-4" />
                  <span>Secure Message</span>
                  {unreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#111116]">
                          {unreadCount}
                      </div>
                  )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CirclePage;