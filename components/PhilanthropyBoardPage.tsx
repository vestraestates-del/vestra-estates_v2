
// FIX: Create PhilanthropyBoardPage component to display project data and handle user interactions, fixing module resolution error.
import React from 'react';
import type { PhilanthropyProject } from '../data/philanthropyData';
// FIX: Added file extension to appData import
import type { RequestItem } from '../data/appData.ts';
import Button from './ui/Button';

interface PhilanthropyBoardPageProps {
    projects: PhilanthropyProject[];
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const PhilanthropyBoardPage: React.FC<PhilanthropyBoardPageProps> = ({ projects, onAddRequest }) => {

    const handleExpressInterest = (project: PhilanthropyProject) => {
        const newRequest: Omit<RequestItem, 'id' | 'requester'> = {
            type: 'Philanthropy',
            title: `Inquiry: ${project.title}`,
            assignee: 'Philanthropy Advisor',
            status: 'Pending',
        };
        onAddRequest(newRequest);
        alert('Your inquiry has been registered. Our Philanthropy Advisor will contact you with further details.');
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Philanthropy Board</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">Opportunities to create a lasting global impact through strategic giving and involvement.</p>
            </header>

            <div className="space-y-12 max-w-5xl mx-auto">
                {projects.map(project => (
                    <div key={project.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group">
                        <div className="md:w-1/3">
                            <img src={project.image} alt={project.title} className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="md:w-2/3 p-8 flex flex-col">
                            <div>
                                <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{project.category}</p>
                                <h2 className="text-2xl font-bold text-white mt-1">{project.title}</h2>
                                <p className="text-gray-300 mt-3 leading-relaxed flex-grow">{project.description}</p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <p className="text-xs text-gray-400">Raised</p>
                                    <p className="text-lg font-semibold text-white">{project.raised} <span className="text-gray-400">of {project.goal}</span></p>
                                </div>
                                <Button size="lg" onClick={() => handleExpressInterest(project)}>
                                    Express Interest
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhilanthropyBoardPage;
