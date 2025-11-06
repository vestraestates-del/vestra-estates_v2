import React, { useState, useRef } from 'react';
import { DocumentArrowDownIcon, CheckCircleIcon, CloseIcon } from './icons/EliteIcons';

interface FileUploadProps {
    label: string;
    onFileSelect: (file: File | null) => void;
    acceptedTypes: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect, acceptedTypes }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
    };

    const handleClearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setSelectedFile(null);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`flex justify-center items-center w-full h-32 px-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                    ${isDragging ? 'border-cyan-500 bg-cyan-900/20' : 'border-gray-600 hover:border-gray-500 bg-gray-900/50'}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={acceptedTypes}
                    onChange={(e) => handleFileChange(e.target.files)}
                />
                {selectedFile ? (
                    <div className="text-center relative w-full">
                        <CheckCircleIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-200 truncate">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                        <button
                            onClick={handleClearFile}
                            className="absolute -top-2 -right-2 p-1 bg-gray-700 rounded-full text-gray-300 hover:bg-red-500 hover:text-white"
                        >
                            <CloseIcon className="w-3 h-3"/>
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <DocumentArrowDownIcon className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-semibold">
                            <span className="text-cyan-400">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs mt-1">PDF, PNG, JPG (max. 10MB)</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
