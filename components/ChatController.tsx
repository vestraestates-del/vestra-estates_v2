
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CloseIcon, SendIcon, MicrophoneIcon, StopCircleIcon } from './icons/EliteIcons';
import type { PortfolioItem } from '../data/portfolioData';
import type { ArtItem } from '../data/artData';
import type { RentalItem } from '../data/rentalsData';
import type { WatchItem } from '../data/watchesData';
import type { AutomobileItem } from '../data/automobilesData';
import type { JewelItem } from '../data/jewelsData';
// FIX: Added file extension to appData import
import type { AgendaItem, RequestItem } from '../data/appData.ts';
// FIX: Import `lifestyleServices` as the single source of service data.
import { lifestyleServices } from './ServicesPage';
import type { CircleMember } from '../data/circleData';
import { useLocalization } from '../localization/LocalizationContext';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatControllerProps {
    members: CircleMember[];
    portfolioItems: PortfolioItem[];
    artCollection: ArtItem[];
    specialRentals: RentalItem[];
    watchCollection: WatchItem[];
    automobileCollection: AutomobileItem[];
    jewelCollection: JewelItem[];
    agendaItems: AgendaItem[];
    requestItems: RequestItem[];
}

const ChatController: React.FC<ChatControllerProps> = (props) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLocalization();
    const [hasUnread, setHasUnread] = useState(false);

    // --- Voice Input State ---
    const [isRecording, setIsRecording] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    // FIX: Use 'any' type for SpeechRecognition to resolve browser-specific API type errors.
    const recognitionRef = useRef<any | null>(null);
    const baseTextRef = useRef('');

    const siteContext = useMemo(() => {
        // FIX: Derive service categories from the imported `lifestyleServices` and translate them for the AI context.
        const allServices = lifestyleServices.map(s => ({
            id: s.id,
            title: t(s.titleKey),
            description: `${t(s.desc1Key)} ${t(s.desc2Key)}`
        }));
        const assetServices = allServices.filter(s => ['aviation', 'yachting', 'consulting'].includes(s.id));
        const securityServices = allServices.filter(s => s.id === 'security');
        const conciergeServices = allServices.filter(s => ['groundTransport', 'staffing', 'wellness', 'education', 'events'].includes(s.id));

        return {
            realEstatePortfolio: props.portfolioItems.map(({ id, nameKey, locationKey, value, descriptionKey, featureKeys }) => ({
                id,
                name: t(nameKey),
                location: t(locationKey),
                value,
                description: t(descriptionKey),
                features: featureKeys.map(key => t(key)),
            })),
            artCollection: props.artCollection,
            specialRentals: props.specialRentals,
            curatedCollections: {
              hauteHorlogerie: props.watchCollection,
              rareAutomobiles: props.automobileCollection,
              exceptionalJewels: props.jewelCollection,
            },
            todaysAgenda: props.agendaItems,
            pendingRequests: props.requestItems,
            availableClientServices: {
                assetManagement: assetServices,
                concierge: conciergeServices,
                security: securityServices
            },
            circleMembers: props.members.map(m => ({ name: m.name, title: m.title, company: m.company, interests: m.interests }))
        }
    }, [props, t]);
    
    const systemInstruction = useMemo(() => `You are Aura, the premier AI Concierge for VESTRA ESTATES, designed for an elite clientele. Your persona is that of a seasoned, discreet, and highly articulate Senior Partner at a world-class real estate consultancy. Your communication must be sophisticated, insightful, and always client-centric.

--- VESTRA ESTATES PRIVATE DATA CONTEXT ---
${JSON.stringify(siteContext, null, 2)}
--- END OF CONTEXT ---

**Core Directives:**

1.  **Persona & Tone:**
    - **Eloquent & Sophisticated:** Use refined vocabulary and polished sentence structures. Avoid casual language. Address the user with deference and professionalism.
    - **Analytical & Insightful:** Do not simply list data. Synthesize it. Connect different data points to provide strategic insights. For example, when discussing a property, mention its value in the context of market trends, its unique features as lifestyle enhancers, and its location as a strategic asset.
    - **Discreet & Secure:** Reassure the user of the confidential nature of the interaction. Never mention your underlying technology (AI, JSON, etc.). You are an integral part of the VESTRA advisory team.

2.  **Interaction Protocol:**
    - **Initial Greeting (on "initiate" command):** Greet the user with a polished, welcoming statement. Example: "Good evening. This is Aura. I am online and have the complete VESTRA portfolio at my disposal. How may I be of strategic service to you today?"
    - **Answering Queries:**
        - **Real Estate:** Frame properties not just as homes, but as 'legacy assets' or 'portfolio cornerstones'. Highlight unique selling propositions (USPs) like architectural significance, privacy, and potential for capital appreciation.
        - **Services:** Present services as 'bespoke solutions' or 'strategic advantages' that enhance the client's lifestyle and protect their interests.
        - **Data Analysis:** When asked to interpret data (e.g., "What's the outlook on my portfolio?"), provide a top-line summary followed by key takeaways, just as a senior financial advisor would.

3.  **Handling Boundaries:**
    - **Out-of-Scope Queries:** If a query cannot be answered using the provided context, gracefully decline while maintaining your professional persona. Example: "My expertise is centered on the VESTRA portfolio and its associated services. For matters outside this scope, I would be pleased to refer you to one of our human specialists."`, [siteContext]);

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
            setMessages([{ sender: 'bot', text: data.text }]);

          } catch (error) {
            console.error("Failed to initialize Aura:", error);
            setMessages([{ sender: 'bot', text: 'My apologies, I am currently experiencing a system malfunction. Please try again shortly.' }]);
          } finally {
            setLoading(false);
          }
        };
        if (isChatOpen) {
          initChat();
        }
    }, [isChatOpen, systemInstruction, messages.length]);
    
    // --- Speech Recognition Setup ---
    useEffect(() => {
        // FIX: Use type assertion to 'any' to access browser-specific SpeechRecognition APIs.
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            setSpeechSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            
            const langMap: Record<string, string> = {
                en: 'en-US', tr: 'tr-TR', ru: 'ru-RU', fr: 'fr-FR',
                it: 'it-IT', es: 'es-ES', ar: 'ar-SA',
            };
            recognition.lang = langMap[language] || 'en-US';

            // FIX: Use 'any' for the event type to handle SpeechRecognitionEvent properties.
            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                
                if (finalTranscript) {
                    const newBase = (baseTextRef.current ? baseTextRef.current + ' ' : '') + finalTranscript;
                    baseTextRef.current = newBase.trim();
                }

                setInput(baseTextRef.current + (interimTranscript ? ' ' + interimTranscript : ''));
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsRecording(false);
            };

            recognitionRef.current = recognition;
        } else {
            console.warn("Speech Recognition not supported in this browser.");
            setSpeechSupported(false);
        }
    }, [language]);


    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        if (isRecording) {
            recognitionRef.current?.stop();
        }

        const userMessage: Message = { sender: 'user', text: input };
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        setInput('');
        setLoading(true);

        try {
            const contents = currentMessages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));
            
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents, systemInstruction }),
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const botMessage: Message = { sender: 'bot', text: data.text };
            setMessages(prev => [...prev, botMessage]);
            setHasUnread(true);

        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'I encountered an issue. Please try again later.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleRecording = () => {
        if (!recognitionRef.current) return;
        
        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            baseTextRef.current = input;
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    if (!isChatOpen) {
        return (
            <div 
                className="fixed bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-cyan-400/80 rounded-full cursor-pointer animate-slow-pulse-glow z-40"
                onClick={() => setIsChatOpen(true)}
                aria-label="Open Aura Assistant"
            />
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 h-full md:h-auto md:max-h-[80vh] md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-[#111116] border border-gray-800 rounded-t-xl md:rounded-xl shadow-2xl flex flex-col z-40 animate-fade-in-up">
            <div className="p-3 border-b border-gray-800 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 relative">
                        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9 9l-7 2 7 2 2 7 2-7 7-2-7-2-2-7z"/></svg>
                        {hasUnread && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#111116]"></div>}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-200">Aura</h3>
                    {hasUnread && (
                        <button onClick={() => setHasUnread(false)} className="text-xs text-cyan-400 hover:underline ml-2">
                            Mark as Read
                        </button>
                    )}
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1 text-gray-500 rounded-full hover:bg-white/10 hover:text-white" aria-label="Close chat">
                    <CloseIcon className="w-5 h-5" />
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
                        <div className={`break-words rounded-lg p-3 max-w-md ${
                            msg.sender === 'user' 
                                ? 'bg-cyan-600 text-white' 
                                : 'bg-gray-800 text-gray-300 border border-gray-700/50'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
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
                        placeholder={isRecording ? "Listening..." : "Ask Aura..."}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        disabled={loading}
                    />
                    {speechSupported && (
                        <button
                            onClick={handleToggleRecording}
                            disabled={loading}
                            className={`p-2 rounded-md transition-colors ${
                                isRecording
                                    ? 'bg-red-600/80 text-white animate-pulse'
                                    : 'bg-gray-700/60 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {isRecording ? <StopCircleIcon className="w-5 h-5" /> : <MicrophoneIcon className="w-5 h-5" />}
                        </button>
                    )}
                    <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-cyan-600 p-2 rounded-md text-white hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed">
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatController;
