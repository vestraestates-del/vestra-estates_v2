import React, { useState } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { designStudioCategories } from '../data/designStudioData';
import { ShowcaseIcon, PlusCircleIcon, KeyIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import type { RequestItem } from '../data/appData';
// FIX: Imported WidgetCard component to resolve reference errors.
import WidgetCard from './ui/WidgetCard';

interface DesignStudioPageProps {
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const DesignStudioPage: React.FC<DesignStudioPageProps> = ({ onAddRequest }) => {
    const { t } = useLocalization();
    const [prompt, setPrompt] = useState('');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [pinnedImages, setPinnedImages] = useState<string[]>([]);
    const [isGeneratingImages, setIsGeneratingImages] = useState(false);
    const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
    const [aiBrief, setAiBrief] = useState('');

    const handleGenerateVision = async () => {
        if (!prompt.trim()) return;
        setIsGeneratingImages(true);
        setGeneratedImages([]);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini-2.5-flash-image',
                    contents: { parts: [{ text: `A photorealistic architectural rendering of: ${prompt}` }] },
                    config: { responseModalities: ['IMAGE'] }
                })
            });
            if (!response.ok) throw new Error('Failed to generate image.');
            const data = await response.json();
            if (data.images && data.images.length > 0) {
                setGeneratedImages(data.images);
            }
        } catch (error) {
            console.error(error);
            // Handle error state in UI
        } finally {
            setIsGeneratingImages(false);
        }
    };

    const handlePinImage = (base64Image: string) => {
        if (!pinnedImages.includes(base64Image)) {
            setPinnedImages(prev => [...prev, base64Image]);
        }
    };
    
    const handleUnpinImage = (base64Image: string) => {
        setPinnedImages(prev => prev.filter(img => img !== base64Image));
    };

    const handleGenerateBrief = async () => {
        if (pinnedImages.length === 0) return;
        setIsGeneratingBrief(true);
        setAiBrief('');
        try {
            const imageParts = pinnedImages.map(base64Data => ({
                inlineData: { mimeType: 'image/jpeg', data: base64Data }
            }));
            const textPart = { text: `Original vision: "${prompt}". Based on this vision and the attached images on the user's vision board, act as a Senior Design Consultant at a luxury firm. Write a professional, structured design brief. Include these sections with bolded titles: **Project Essence**, **Key Architectural & Stylistic Themes**, **Material & Color Palette Suggestions**, and **Spatial & Atmospheric Considerations**.` };

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini-2.5-flash',
                    contents: { parts: [textPart, ...imageParts] }
                })
            });
            if (!response.ok) throw new Error('Failed to generate brief.');
            const data = await response.json();
            setAiBrief(data.text);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGeneratingBrief(false);
        }
    };
    
    const handleBookSession = () => {
        const details = `
            DESIGN BRIEF SUBMISSION
            --------------------------
            ORIGINAL VISION PROMPT:
            ${prompt}
            
            AI-GENERATED DESIGN BRIEF:
            ${aiBrief}
            
            VISUAL REFERENCES:
            ${pinnedImages.length} images were included in the vision board.
        `;
        
        onAddRequest({
            type: 'Action',
            title: `Design Studio: New Project Brief - ${prompt.substring(0, 30)}...`,
            assignee: 'Design Principal',
            status: 'Pending',
            details
        });
        alert(t('designStudio.sessionRequestSuccess'));
        // Reset state
        setPrompt('');
        setGeneratedImages([]);
        setPinnedImages([]);
        setAiBrief('');
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-12 text-center">
                <div className="flex justify-center text-cyan-400 mb-4"><ShowcaseIcon className="w-16 h-16" /></div>
                <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('designStudio.pageTitle')}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('designStudio.pageSubtitle')}</p>
            </header>

            <div className="max-w-7xl mx-auto space-y-12">
                {/* Step 1: Vision Input */}
                <WidgetCard title="1. Describe Your Vision">
                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., A serene Japanese-inspired villa overlooking the Pacific Ocean, with extensive use of cedar wood and large glass panels." rows={3} className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300" />
                    <Button onClick={handleGenerateVision} disabled={isGeneratingImages || !prompt.trim()} className="mt-4">
                        {isGeneratingImages ? 'Generating...' : 'Generate Concept Image'}
                    </Button>
                </WidgetCard>

                {/* Step 2: Curate Inspiration */}
                {(generatedImages.length > 0 || isGeneratingImages) && (
                    <WidgetCard title="2. Curate Your Inspiration">
                        {isGeneratingImages && <div className="text-center p-8">Generating visual concept...</div>}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {generatedImages.map((img, i) => (
                                <div key={i} className="group relative aspect-square rounded-lg overflow-hidden">
                                    <img src={`data:image/jpeg;base64,${img}`} alt="AI generated concept" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button size="sm" onClick={() => handlePinImage(img)}>Pin to Board</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </WidgetCard>
                )}

                {/* Step 3: Vision Board */}
                 <WidgetCard title="3. Your Vision Board">
                     {pinnedImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {pinnedImages.map((img, i) => (
                                <div key={i} className="group relative aspect-square rounded-lg overflow-hidden">
                                    <img src={`data:image/jpeg;base64,${img}`} alt="Pinned vision" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button variant="secondary" size="sm" onClick={() => handleUnpinImage(img)}>Remove</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                     ) : (
                         <p className="text-gray-500 text-center py-4">Pin images from AI generations or our portfolio to create your vision board.</p>
                     )}
                     <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-4">Inspiration from Our Portfolio</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                         {designStudioCategories.flatMap(cat => cat.images.slice(0, 1)).map((imgUrl, i) => (
                              <div key={i} className="group relative aspect-square rounded-lg overflow-hidden">
                                <img src={imgUrl} alt="Portfolio inspiration" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <Button size="sm" onClick={() => handlePinImage(imgUrl)}>Pin to Board</Button>
                                </div>
                            </div>
                         ))}
                     </div>
                 </WidgetCard>
                
                {/* Step 4: AI Brief */}
                <WidgetCard title="4. AI-Generated Design Brief">
                    <Button onClick={handleGenerateBrief} disabled={isGeneratingBrief || pinnedImages.length === 0} className="mb-4">
                        {isGeneratingBrief ? 'Generating Brief...' : 'Generate Design Brief from Vision Board'}
                    </Button>
                    {(aiBrief || isGeneratingBrief) && (
                        <div className="bg-gray-900/50 border border-gray-700 rounded-md p-4 min-h-[200px]">
                            {isGeneratingBrief ? <div className="text-gray-400">Synthesizing brief...</div> : <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{aiBrief}</div>}
                        </div>
                    )}
                </WidgetCard>

                {/* Step 5: Finalize */}
                <div className="text-center py-6">
                     <h2 className="text-xl font-bold text-white">5. Initiate Project</h2>
                     <p className="text-gray-400 mt-2 mb-6">Submit your vision board and design brief to begin a formal consultation with our design principal.</p>
                     <Button size="lg" onClick={handleBookSession} disabled={!prompt.trim() && pinnedImages.length === 0}>
                        <KeyIcon className="w-5 h-5 mr-2" />
                        {t('designStudio.bookSessionButton')}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default DesignStudioPage;