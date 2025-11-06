
import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { CircleMember } from '../data/circleData';
import { CloseIcon, SendIcon } from './icons/EliteIcons';
import type { PortfolioItem } from '../data/portfolioData';
import type { ArtItem } from '../data/artData';
import type { RentalItem } from '../data/rentalsData';
import type { WatchItem } from '../data/watchesData';
import type { AutomobileItem } from '../data/automobilesData';
import type { JewelItem } from '../data/jewelsData';
// FIX: Added file extension to appData import
import type { AgendaItem, RequestItem } from '../data/appData.ts';
// FIX: Import `lifestyleServices` as the single source of service data.
import { lifestyleServices, LifestyleService } from './ServicesPage';
import { useLocalization } from '../localization/LocalizationContext';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface MemberChatWindowProps {
  member: CircleMember;
  onClose: () => void;
  portfolioItems: PortfolioItem[];
  artCollection: ArtItem[];
  specialRentals: RentalItem[];
  watchCollection: WatchItem[];
  automobileCollection: AutomobileItem[];
  jewelCollection: JewelItem[];
  agendaItems: AgendaItem[];
  requestItems: RequestItem[];
  onNewMessage: () => void;
}

const MemberChatWindow: React.FC<MemberChatWindowProps> = ({ member, onClose, portfolioItems, artCollection, specialRentals, watchCollection, automobileCollection, jewelCollection, agendaItems, requestItems, onNewMessage }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLocalization();

  const siteContext = useMemo(() => {
    // FIX: Derive service categories from the imported `lifestyleServices` and translate them for the AI context.
    const allServices = (lifestyleServices as LifestyleService[]).map(s => ({
        id: s.id,
        title: t(s.titleKey),
        description: `${t(s.desc1Key)} ${t(s.desc2Key)}`
    }));
    const assetServices = allServices.filter(s => ['aviation', 'yachting', 'consulting'].includes(s.id));
    const securityServices = allServices.filter(s => s.id === 'security');
    const conciergeServices = allServices.filter(s => ['groundTransport', 'staffing', 'wellness', 'education', 'events'].includes(s.id));

    return {
        realEstatePortfolio: portfolioItems.map(({ id, nameKey, locationKey, value, descriptionKey, featureKeys, amenities }) => ({
            id,
            name: t(nameKey),
            location: t(locationKey),
            value,
            description: t(descriptionKey),
            features: featureKeys.map(key => t(key)),
            amenities: amenities?.map(a => ({ name: t(a.nameKey), icon: a.icon }))
        })),
        artCollection: artCollection,
        specialRentals: specialRentals,
        curatedCollections: {
          hauteHorlogerie: watchCollection,
          rareAutomobiles: automobileCollection,
          exceptionalJewels: jewelCollection,
        },
        todaysAgenda: agendaItems,
        pendingRequests: requestItems,
        availableClientServices: {
            assetManagement: assetServices,
            concierge: conciergeServices,
            security: securityServices
        }
    }
  }, [portfolioItems, artCollection, specialRentals, watchCollection, automobileCollection, jewelCollection, agendaItems, requestItems, t]);

   const systemInstruction = useMemo(() => {
    const salutation = member.gender === 'male' ? 'Mr.' : member.gender === 'female' ? 'Ms.' : '';
    const lastName = member.name.split(' ').pop();
    
    return `You are Aura, an AI Concierge from VESTRA ESTATES, facilitating a secure, asynchronous communication channel between two esteemed members of The Circle: the user and ${member.name}.

Your role is to act as a professional and discreet intermediary. You will answer the user's questions on behalf of ${member.name}, using *only* the information available within the shared VESTRA ESTATES knowledge base. You are essentially acting as an intelligent, informed representative for ${member.name}.

--- SHARED KNOWLEDGE BASE START ---
${JSON.stringify(siteContext, null, 2)}
--- SHARED KNOWLEDGE BASE END ---

**Core Directives & Protocol:**

1.  **Persona:** Maintain a tone of utmost professionalism and discretion. You are a trusted facilitator in a high-stakes network.

2.  **Initial Message (on "initiate" command):** You MUST use this exact phrase: "You have opened a secure communication channel with the office of ${salutation} ${lastName}, facilitated by Aura. Please state your inquiry."

3.  **Answering Queries:**
    - When a user asks a question that can be answered from the knowledge base (e.g., "I'm interested in ${member.name}'s thoughts on the Bosphorus Estate"), you will synthesize the relevant data and present it as a formal response.
    - **Example Response:** "Regarding The Bosphorus Estate, our records indicate it is a premier waterfront asset valued at $115M, notable for its historic architecture and strategic location. It is currently an active part of the portfolio."

4.  **Handling Out-of-Scope Queries:**
    - If a query is personal, speculative, or requires scheduling (e.g., "Can we meet for lunch?", "What does ${member.name} think of the current market?"), you MUST gracefully redirect.
    - **Mandatory Response for Out-of-Scope Queries:** "That inquiry requires personal attention. I have logged your request and forwarded it directly to ${salutation} ${lastName}'s executive assistant for their consideration."
    - **Never** attempt to answer personal questions or make up information. Your boundary is the provided knowledge base.`;
   }, [member, siteContext]);

  useEffect(() => {
    const initChat = async () => {
      if (messages.length > 0) return;
      setLoading(true);
      try {
        const contents = [{ role: 'user', parts: [{ text: 'initiate' }] }];
        
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents, systemInstruction }),
        });
        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        setMessages([{ sender: 'bot', text: data.text, timestamp: new Date() }]);
        
      } catch (error) {
        console.error("Failed to initialize member chat:", error);
        setMessages([{ sender: 'bot', text: 'Apologies, this communication channel is currently unavailable.', timestamp: new Date() }]);
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [member.id, systemInstruction, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { sender: 'user', text: input, timestamp: new Date() };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setLoading(true);

    try {
      const contents = currentMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
      }));
      
      onNewMessage();

      const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents, systemInstruction }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const botMessage: Message = { sender: 'bot', text: data.text, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'I encountered an issue. Please try again later.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  return (
    <div className="w-80 h-96 bg-[#111116] border border-gray-800 rounded-xl shadow-2xl flex flex-col z-30 animate-fade-in-up transition-transform">
      <div className="p-3 border-b border-gray-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
          <h3 className="font-semibold text-sm text-gray-200">{member.name}</h3>
        </div>
        <button onClick={onClose} className="p-1 text-gray-500 rounded-full hover:bg-white/10 hover:text-white" aria-label="Close chat">
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                     <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9 9l-7 2 7 2 2 7 2-7 7-2-7-2-2-7z"/></svg>
                </div>
            )}
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`break-words rounded-lg p-3 max-w-xs text-sm ${
                    msg.sender === 'user' 
                        ? 'bg-cyan-600 text-white rounded-br-none' 
                        : 'bg-gray-800 text-gray-300 border border-gray-700/50 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(msg.timestamp)}
                </span>
            </div>
          </div>
        ))}
        {loading && messages.length > 0 && ( // Show loading only when waiting for a response
             <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9 9l-7 2 7 2 2 7 2-7 7-2-7-2-2-7z"/></svg>
                </div>
                 <div className="bg-gray-800 rounded-lg px-4 py-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 dot-flashing">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${member.name}...`}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-cyan-600 p-2 rounded-md text-white hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberChatWindow;
