import React, { useState, lazy, Suspense } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';
import { initialBlogPosts, BlogPost } from '../../../data/blogData';
import { initialMenuItems, MenuItem } from '../../../data/adminData';
import { EditIcon, TrashIcon, PlusCircleIcon } from '../../icons/EliteIcons';

const BlogEditorModal = lazy(() => import('./BlogEditorModal'));
const MenuEditorModal = lazy(() => import('./MenuEditorModal'));

const Cms: React.FC = () => {
    const [slogan, setSlogan] = useState("Ultra-Luxury Real Estate for the World's Top 0.1%.");
    const [siteTitle, setSiteTitle] = useState("VESTRA ESTATES");
    const [metaDescription, setMetaDescription] = useState("An exclusive, AI-powered digital concierge for ultra-luxury real estate.");

    const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
    const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

    const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
    const [editingMenuItem, setEditingMenuItem] = useState<Partial<MenuItem> | null>(null);

    // State for drag and drop
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleSave = (section: string) => {
        alert(`${section} settings have been saved.`);
    };

    const handleSavePost = (postToSave: Partial<BlogPost>) => {
        if (postToSave.id) {
            setPosts(posts.map(p => p.id === postToSave.id ? { ...p, ...postToSave } as BlogPost : p));
        } else {
            const newPost = { ...postToSave, id: Date.now(), date: new Date().toISOString().split('T')[0] } as BlogPost;
            setPosts([newPost, ...posts]);
        }
        setEditingPost(null);
    };

    const handleDeletePost = (postId: number) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            setPosts(posts.filter(p => p.id !== postId));
        }
    };

    const handleSaveMenuItem = (itemToSave: Partial<MenuItem>) => {
        if (itemToSave.id) {
            setMenuItems(menuItems.map(item => item.id === itemToSave.id ? { ...item, ...itemToSave } as MenuItem : item));
        } else {
            const newItem = { ...itemToSave, id: Date.now() } as MenuItem;
            setMenuItems([...menuItems, newItem]);
        }
        setEditingMenuItem(null);
    };

    const handleDeleteMenuItem = (itemId: number) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            setMenuItems(menuItems.filter(item => item.id !== itemId));
        }
    };

    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedIndex === null || dragOverIndex === null || draggedIndex === dragOverIndex) {
            // No change or invalid drop, reset
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newItems = [...menuItems];
        const [draggedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(dragOverIndex, 0, draggedItem);
        
        setMenuItems(newItems);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };


    return (
        <>
            <div>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Content Management (CMS)</h1>
                    <p className="text-gray-400">Manage website content, menus, and SEO settings.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WidgetCard title="Landing Page Content">
                        <div className="space-y-2">
                            <div>
                                <label className="text-sm text-gray-400">Main Slogan</label>
                                <input 
                                    type="text" 
                                    value={slogan}
                                    onChange={(e) => setSlogan(e.target.value)}
                                    className="w-full bg-gray-900 border-gray-700 rounded p-2" 
                                />
                            </div>
                            <Button size="sm" className="mt-2" onClick={() => handleSave('Landing Page')}>Save</Button>
                        </div>
                    </WidgetCard>
                    <WidgetCard title="SEO Settings">
                        <div className="space-y-2">
                            <div>
                                <label className="text-sm text-gray-400">Site Title</label>
                                <input 
                                    type="text" 
                                    value={siteTitle}
                                    onChange={(e) => setSiteTitle(e.target.value)}
                                    className="w-full bg-gray-900 border-gray-700 rounded p-2" 
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Meta Description</label>
                                <textarea 
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    className="w-full bg-gray-900 border-gray-700 rounded p-2 h-16"
                                ></textarea>
                            </div>
                            <Button size="sm" className="mt-2" onClick={() => handleSave('SEO')}>Save SEO</Button>
                        </div>
                    </WidgetCard>

                    <div className="md:col-span-2">
                        <WidgetCard title="Blog / Article System">
                            <div className="flex justify-end mb-4">
                                <Button size="sm" onClick={() => setEditingPost({})} className="flex items-center gap-2"><PlusCircleIcon className="w-4 h-4"/>New Article</Button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-400">
                                    <thead className="text-xs uppercase bg-white/5">
                                        <tr>
                                            <th className="px-4 py-2">Title</th>
                                            <th className="px-4 py-2">Author</th>
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map(post => (
                                            <tr key={post.id} className="border-b border-gray-800 hover:bg-white/5">
                                                <td className="px-4 py-2 font-medium text-white">{post.title}</td>
                                                <td className="px-4 py-2">{post.author}</td>
                                                <td className="px-4 py-2">{post.date}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => setEditingPost(post)}><EditIcon className="w-4 h-4"/></Button>
                                                    <Button variant="ghost" size="sm" className="hover:bg-red-500/10" onClick={() => handleDeletePost(post.id)}><TrashIcon className="w-4 h-4"/></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </WidgetCard>
                    </div>

                    <WidgetCard title="Site Menu Management">
                        <div className="flex justify-end mb-4">
                            <Button size="sm" onClick={() => setEditingMenuItem({})} className="flex items-center gap-2"><PlusCircleIcon className="w-4 h-4"/>Add Menu Item</Button>
                        </div>
                        <div 
                            className="space-y-2"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                        >
                            {menuItems.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    {dragOverIndex === index && <div className="h-1 bg-cyan-500 rounded-full my-1 transition-all" />}
                                    <div
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        className={`flex justify-between items-center p-2 bg-white/5 rounded cursor-move transition-opacity ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}`}
                                    >
                                        <div>
                                            <span className="text-white font-semibold">{item.label}</span>
                                            <span className="text-gray-500 text-sm ml-2">({item.path})</span>
                                        </div>
                                        <div>
                                            <Button variant="ghost" size="sm" className="mr-2" onClick={() => setEditingMenuItem(item)}><EditIcon className="w-4 h-4"/></Button>
                                            <Button variant="ghost" size="sm" className="hover:bg-red-500/10" onClick={() => handleDeleteMenuItem(item.id)}><TrashIcon className="w-4 h-4"/></Button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </WidgetCard>
                </div>
            </div>
            <Suspense fallback={null}>
                {editingPost !== null && (
                    <BlogEditorModal
                        post={editingPost}
                        onClose={() => setEditingPost(null)}
                        onSave={handleSavePost}
                    />
                )}
                {editingMenuItem !== null && (
                    <MenuEditorModal
                        item={editingMenuItem}
                        onClose={() => setEditingMenuItem(null)}
                        onSave={handleSaveMenuItem}
                    />
                )}
            </Suspense>
        </>
    );
};

export default Cms;