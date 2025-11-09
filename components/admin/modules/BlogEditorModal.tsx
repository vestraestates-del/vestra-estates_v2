import React, { useState } from 'react';
import { CloseIcon } from '../../icons/EliteIcons.tsx';
import Button from '../../ui/Button.tsx';
import { BlogPost } from '../../../data/blogData.ts';
import FileUpload from '../../FileUpload.tsx';

interface BlogEditorModalProps {
    post: Partial<BlogPost> | null;
    onClose: () => void;
    onSave: (post: Partial<BlogPost>) => void;
}

const BlogEditorModal: React.FC<BlogEditorModalProps> = ({ post, onClose, onSave }) => {
    const [editedPost, setEditedPost] = useState(post || { author: 'Admin' });
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedPost(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (file: File | null) => {
        if (!file) {
            setEditedPost(prev => ({ ...prev, image: '' }));
            return;
        }

        setIsUploading(true);
        setUploadError('');

        try {
            const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const newBlob = await response.json();
            setEditedPost(prev => ({ ...prev, image: newBlob.url }));
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError('Image upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedPost);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in overscroll-contain" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{post?.id ? 'Edit' : 'Create'} Article</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="p-6 space-y-4 overflow-y-auto">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                            <input id="title" name="title" type="text" value={editedPost.title || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-400 mb-1">Author</label>
                                <input id="author" name="author" type="text" value={editedPost.author || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <FileUpload
                                    label="Article Image"
                                    onFileSelect={handleImageUpload}
                                    acceptedTypes="image/jpeg, image/png, image/webp"
                                />
                                {isUploading && <p className="text-sm text-cyan-400 mt-2">Uploading...</p>}
                                {uploadError && <p className="text-sm text-red-400 mt-2">{uploadError}</p>}
                            </div>
                        </div>
                        {editedPost.image && !isUploading && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-400 mb-2">Image Preview:</p>
                                <img src={editedPost.image} alt="Preview" className="w-full h-auto max-h-48 object-cover rounded-md border border-gray-700" />
                            </div>
                        )}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">Content</label>
                            <textarea id="content" name="content" value={editedPost.content || ''} onChange={handleChange} required rows={10} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"></textarea>
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Article</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogEditorModal;