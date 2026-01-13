import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, UploadCloud, X, RefreshCw, Check, Image as ImageIcon, Plus, ArrowUpDown, Trash2, Clock, Globe, Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, Music, Send, MapPin, Link as LinkIcon, Hash } from 'lucide-react';
import ReusableDesignAccordion from './ReusableDesignAccordion';
import ImageUploadModal from './ImageUploadModal';
import axios from 'axios';

const MenuConfig = ({ config, onChange }) => {
    // Accordion States
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTimingsOpen, setIsTimingsOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    // Sub-accordion state for Menu Categories
    const [openCategoryId, setOpenCategoryId] = useState(() => {
        if (config.menu?.categories && config.menu.categories.length > 0) {
            return config.menu.categories[0].id;
        }
        return 'burger';
    });

    // Image Preview State (Existing preview modal)
    const [showImageModal, setShowImageModal] = useState(false);
    const [isHoveringUpload, setIsHoveringUpload] = useState(false);

    // State for background upload modal (New reusable modal)
    const [isBgModalOpen, setIsBgModalOpen] = useState(false);
    const [tempBgImage, setTempBgImage] = useState(null);
    const [bgFileName, setBgFileName] = useState('');

    const design = config.design || {};
    const businessInfo = config.businessInfo || {};

    // Initial State handling for Categories
    const [categories, setCategories] = useState(() => {
        if (config.menu?.categories && config.menu.categories.length > 0) {
            return config.menu.categories;
        }
        return [
            {
                id: 'burger',
                name: 'Burger',
                products: [
                    {
                        id: 'p1',
                        name: 'Zinger Burger',
                        price: '10',
                        description: 'jalapeno + cheese',
                        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80'
                    }
                ]
            },
            {
                id: 'coffee',
                name: 'Coffee',
                products: []
            },
            {
                id: 'juices',
                name: 'Juices',
                products: []
            }
        ];
    });

    // Timings State
    const [timeFormat, setTimeFormat] = useState(businessInfo?.timeFormat || 'AM/PM');
    const [timings, setTimings] = useState(businessInfo?.timings || [
        { day: 'Monday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
        { day: 'Tuesday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
        { day: 'Wednesday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
        { day: 'Thursday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
        { day: 'Friday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
        { day: 'Saturday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
        { day: 'Sunday', isOpen: false, start: '08:00 AM', end: '08:00 AM' },
    ]);

    // Social Media State
    const [socials, setSocials] = useState(businessInfo?.socials || [
        { id: 'website', name: 'Website', icon: 'globe', placeholder: 'https://', url: '' },
        { id: 'facebook', name: 'Facebook', icon: 'facebook', placeholder: 'https://', url: '' },
        { id: 'instagram', name: 'Instagram', icon: 'instagram', placeholder: 'https://', url: '' }
    ]);

    // Available Social Icons Map
    const availableSocials = [
        { id: 'facebook', color: '#1877F2', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' },
        { id: 'instagram', color: '#E4405F', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png' },
        { id: 'twitter', color: '#000000', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png' },
        { id: 'linkedin', color: '#0A66C2', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
        { id: 'discord', color: '#5865F2', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png' },
        { id: 'twitch', color: '#9146FF', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111668.png' },
        { id: 'youtube', color: '#FF0000', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' },
        { id: 'whatsapp', color: '#25D366', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png' },
        { id: 'snapchat', color: '#FFFC00', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png' },
        { id: 'tiktok', color: '#000000', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png' },
        { id: 'tumblr', color: '#36465D', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968943.png' },
        { id: 'spotify', color: '#1DB954', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png' },
        { id: 'pinterest', color: '#BD081C', icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png' },
        { id: 'telegram', color: '#0088CC', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png' },
        { id: 'reddit', color: '#FF4500', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670154.png' },
        { id: 'website', color: '#4F46E5', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png' }
    ];

    // Helper functions
    const updateCategories = (newCategories) => {
        setCategories(newCategories);
        onChange(prev => ({
            ...prev,
            menu: { ...prev.menu, categories: newCategories }
        }));
    };

    const handleCategoryNameChange = (id, newName) => {
        const newCats = categories.map(c => c.id === id ? { ...c, name: newName } : c);
        updateCategories(newCats);
    };

    const handleProductChange = (catId, prodId, field, value) => {
        const newCats = categories.map(c => {
            if (c.id !== catId) return c;
            const newProds = c.products.map(p => p.id === prodId ? { ...p, [field]: value } : p);
            return { ...c, products: newProds };
        });
        updateCategories(newCats);
    };

    const handleAddProduct = (catId) => {
        const newCats = categories.map(c => {
            if (c.id !== catId) return c;
            return {
                ...c,
                products: [...c.products, { id: Date.now(), name: '', price: '', description: '', image: '' }]
            };
        });
        updateCategories(newCats);
    };

    const handleRemoveProduct = (catId, prodId) => {
        const newCats = categories.map(c => {
            if (c.id === catId) {
                return { ...c, products: c.products.filter(p => p.id !== prodId) };
            }
            return c;
        });
        updateCategories(newCats);
    };

    const handleRemoveCategory = (catId) => {
        const newCategories = categories.filter(c => c.id !== catId);
        updateCategories(newCategories);
        if (openCategoryId === catId) {
            setOpenCategoryId(newCategories.length > 0 ? newCategories[0].id : null);
        }
    };

    const handleProductImageUpload = async (catId, prodId, file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) { alert('Please select an image file'); return; }
        if (file.size > 5 * 1024 * 1024) { alert('File size should be less than 5MB'); return; }
        try {
            const formData = new FormData();
            formData.append('image', file);
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
            const res = await axios.post(`${baseUrl}api/upload/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            handleProductChange(catId, prodId, 'image', res.data.url);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed. Please try again.');
        }
    };

    const handleAddCategory = () => {
        const newId = `cat-${Date.now()}`;
        const newCat = { id: newId, name: '', products: [] };
        const newCategories = [...categories, newCat];
        updateCategories(newCategories);
        setOpenCategoryId(newId);
    };

    const toggleCategory = (id) => {
        setOpenCategoryId(prev => prev === id ? null : id);
    };

    const handleDesignSectionUpdate = (key, value) => {
        onChange(prev => {
            const newDesign = { ...prev.design };
            const keys = key.split('.');
            if (keys.length === 1) {
                newDesign[keys[0]] = value;
            } else {
                if (!newDesign[keys[0]]) newDesign[keys[0]] = {};
                newDesign[keys[0]] = { ...newDesign[keys[0]], [keys[1]]: value };
            }
            return { ...prev, design: newDesign };
        });
    };

    const handleBusinessInfoUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            businessInfo: { ...prev.businessInfo, [key]: value }
        }));
    };

    const getSocialIcon = (id) => {
        const item = availableSocials.find(s => s.id === id);
        if (!item) return <Globe size={20} color="#fff" />;
        return <img src={item.icon} alt="" style={{ width: '20px', height: '20px', objectFit: 'contain', filter: item.id === 'snapchat' || item.color === '#fffc00' ? 'none' : 'brightness(0) invert(1)' }} />;
    };

    const getSocialColor = (id) => {
        const item = availableSocials.find(s => s.id === id);
        return item ? item.color : '#94a3b8';
    };

    const handleSocialChange = (index, value) => {
        const newSocials = [...socials];
        newSocials[index].url = value;
        setSocials(newSocials);
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, socials: newSocials } }));
    };

    const handleAddSocial = (id) => {
        if (socials.find(s => s.id === id)) return;
        const newItem = { id, name: id.charAt(0).toUpperCase() + id.slice(1), url: '', placeholder: 'https://' };
        const newSocials = [...socials, newItem];
        setSocials(newSocials);
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, socials: newSocials } }));
    };

    const handleRemoveSocial = (index) => {
        const newSocials = socials.filter((_, i) => i !== index);
        setSocials(newSocials);
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, socials: newSocials } }));
    };

    const handleTimingChange = (index, field, value) => {
        const newTimings = [...timings];
        newTimings[index][field] = value;
        setTimings(newTimings);
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, timings: newTimings } }));
    };

    const handleTimeFormatChange = (format) => {
        setTimeFormat(format);
        let updatedTimings = [...timings];
        if (format === '24 hrs') {
            updatedTimings = timings.map(t => ({
                ...t,
                start: t.start ? t.start.replace(/\s*(AM|PM|am|pm)/i, '').trim() : t.start,
                end: t.end ? t.end.replace(/\s*(AM|PM|am|pm)/i, '').trim() : t.end
            }));
            setTimings(updatedTimings);
        }
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, timings: updatedTimings, timeFormat: format } }));
    };

    // Effects
    useEffect(() => {
        if (!config.menu?.categories || config.menu.categories.length === 0) {
            onChange(prev => ({ ...prev, menu: { ...prev.menu, categories: categories } }));
        }
    }, []);

    useEffect(() => {
        if (businessInfo?.timings) setTimings(businessInfo.timings);
        if (businessInfo?.timeFormat) setTimeFormat(businessInfo.timeFormat);
    }, [businessInfo?.timings, businessInfo?.timeFormat]);

    const palettes = [
        { p: '#1e293b', s: '#ffa305' },
        { p: '#0f172a', s: '#334155' },
        { p: '#0f766e', s: '#22c55e' },
        { p: '#4c1d95', s: '#ffa305' },
        { p: '#0369a1', s: '#38bdf8' }
    ];
    const bgImages = [{ id: '1', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' }, { id: '2', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400' }, { id: '3', url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400' }, { id: '4', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400' }, { id: '5', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400' }];
    const logos = [{ id: '1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }, { id: '2', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Food' }, { id: '3', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' }];

    return (
        <div>
            <ReusableDesignAccordion
                design={{
                    ...design,
                    primaryColor: design.primaryColor || '#1e293b',
                    secondaryColor: design.secondaryColor || '#ffa305'
                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'primaryColor', secondary: 'secondaryColor' }}
                palettes={palettes}
                logoKey="logo.url"
                showLogo={true}
                logoLabel="LOGO"
                logoOptions={logos}
            >
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>BACKGROUND IMAGE</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        <div onClick={() => handleDesignSectionUpdate('backgroundImage', '')} style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <X size={32} color="#e2e8f0" />
                        </div>
                        {bgImages.map(img => (
                            <div key={img.id} onClick={() => handleDesignSectionUpdate('backgroundImage', img.url)} style={{ width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', border: design.backgroundImage === img.url ? '2px solid #ffa305' : '1px solid #e2e8f0', position: 'relative', cursor: 'pointer' }}>
                                <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {design.backgroundImage === img.url && (
                                    <div style={{ position: 'absolute', top: '4px', right: '4px', background: '#ffa305', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Check size={12} color="#fff" strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                        ))}
                        {design.backgroundImage && !bgImages.find(img => img.url === design.backgroundImage) && (
                            <div onClick={() => setShowImageModal(true)} onMouseEnter={() => setIsHoveringUpload(true)} onMouseLeave={() => setIsHoveringUpload(false)} style={{ width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', border: '2px solid #ffa305', position: 'relative', cursor: 'pointer' }}>
                                <img src={design.backgroundImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {isHoveringUpload && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                        <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>Preview</span>
                                    </div>
                                )}
                                <div style={{ position: 'absolute', top: '4px', right: '4px', background: '#ffa305', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                                    <Check size={12} color="#fff" strokeWidth={3} />
                                </div>
                            </div>
                        )}
                        <label style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setBgFileName(file.name);
                                    const reader = new FileReader();
                                    reader.onload = () => { setTempBgImage(reader.result); setIsBgModalOpen(true); };
                                    reader.readAsDataURL(file);
                                }
                                e.target.value = '';
                            }} />
                            <UploadCloud size={24} color="#94a3b8" />
                        </label>
                    </div>
                </div>
            </ReusableDesignAccordion>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'none' }}>Basic Information</div>
                    <motion.div animate={{ rotate: isBasicInfoOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isBasicInfoOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Restaurant Name*</label>
                                    <input type="text" value={businessInfo.title || ''} onChange={e => handleBusinessInfoUpdate('title', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #334155', borderRadius: '10px', background: '#020617', color: '#e5e7eb', outline: 'none' }} />
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Title*</label>
                                    <input type="text" value={businessInfo.headline || 'DOWNLOAD NOW'} onChange={e => handleBusinessInfoUpdate('headline', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #334155', borderRadius: '10px', background: '#020617', color: '#e5e7eb', outline: 'none' }} />
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Description</label>
                                    <textarea value={businessInfo.description || ''} onChange={e => handleBusinessInfoUpdate('description', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #334155', borderRadius: '10px', background: '#020617', color: '#e5e7eb', outline: 'none', minHeight: '80px' }} />
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Website*</label>
                                    <input type="text" value={businessInfo.website || ''} onChange={e => handleBusinessInfoUpdate('website', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #334155', borderRadius: '10px', background: '#020617', color: '#e5e7eb', outline: 'none' }} />
                                </div>
                                <div style={{ marginBottom: '0.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>No of Tables*</label>
                                    <input type="number" value={businessInfo.tables || ''} onChange={e => handleBusinessInfoUpdate('tables', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #334155', borderRadius: '10px', background: '#020617', color: '#e5e7eb', outline: 'none' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>Menu</div>
                    <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {categories.map((cat) => (
                                        <motion.div
                                            key={cat.id}
                                            layout
                                            style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e293b', background: '#020617' }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleCategory(cat.id)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.9rem 1.1rem',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    background: 'rgba(15,23,42,0.9)',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{ width: 26, height: 26, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#e5e7eb', fontSize: '0.75rem' }}>
                                                        {cat.name ? cat.name.charAt(0).toUpperCase() : '+'}
                                                    </div>
                                                    <div style={{ textAlign: 'left' }}>
                                                        <div style={{ fontWeight: '600', color: '#f8fafc', fontSize: '0.95rem' }}>{cat.name || 'New Category'}</div>
                                                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{cat.products.length} items</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <ArrowUpDown size={16} color="#64748b" />
                                                    {openCategoryId === cat.id ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {openCategoryId === cat.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -6 }}
                                                        transition={{ duration: 0.2 }}
                                                        style={{ padding: '1.1rem 1.1rem 1.2rem' }}
                                                    >
                                                        <div style={{ marginBottom: '1rem' }}>
                                                            <input
                                                                type="text"
                                                                value={cat.name}
                                                                onChange={(e) => handleCategoryNameChange(cat.id, e.target.value)}
                                                                placeholder="Category Name"
                                                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                                                            />
                                                        </div>
                                                        {cat.products.map((prod) => (
                                                            <div key={prod.id} style={{ border: '1px solid #1e293b', padding: '1rem', borderRadius: '12px', marginBottom: '0.9rem', background: '#020617' }}>
                                                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                                                    <input
                                                                        type="text"
                                                                        value={prod.name}
                                                                        placeholder="Product Name"
                                                                        onChange={(e) => handleProductChange(cat.id, prod.id, 'name', e.target.value)}
                                                                        style={{ flex: '1 1 150px', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={prod.price}
                                                                        placeholder="Price"
                                                                        onChange={(e) => handleProductChange(cat.id, prod.id, 'price', e.target.value)}
                                                                        style={{ flex: '0 0 100px', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                                                                    />
                                                                </div>
                                                                <textarea
                                                                    value={prod.description}
                                                                    placeholder="Description"
                                                                    onChange={(e) => handleProductChange(cat.id, prod.id, 'description', e.target.value)}
                                                                    style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none', marginBottom: '0.6rem' }}
                                                                />
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
                                                                    {prod.image && <img src={prod.image} style={{ width: 46, height: 46, objectFit: 'cover', borderRadius: '10px', border: '1px solid #1e293b' }} />}
                                                                    <label style={{ padding: '0.5rem 0.9rem', borderRadius: '999px', border: '1px dashed #334155', color: '#e5e7eb', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.8rem', background: 'rgba(15,23,42,0.9)' }}>
                                                                        <ImageIcon size={16} />
                                                                        <span>Product Image</span>
                                                                        <input type="file" accept="image/*" onChange={(e) => handleProductImageUpload(cat.id, prod.id, e.target.files[0])} style={{ display: 'none' }} />
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveProduct(cat.id, prod.id)}
                                                                        style={{ marginLeft: 'auto', borderRadius: '999px', padding: '0.45rem 0.75rem', border: 'none', background: 'rgba(248,113,113,0.12)', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.8rem' }}
                                                                    >
                                                                        <Trash2 size={14} />
                                                                        <span>Remove</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAddProduct(cat.id)}
                                                                style={{ borderRadius: '999px', padding: '0.55rem 1rem', border: 'none', background: 'rgba(255,163,5,0.15)', color: '#ffd89a', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                                                            >
                                                                <Plus size={16} />
                                                                <span>Add Product</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveCategory(cat.id)}
                                                                style={{ borderRadius: '999px', padding: '0.55rem 1rem', border: 'none', background: 'rgba(248,113,113,0.12)', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                                                            >
                                                                <Trash2 size={16} />
                                                                <span>Remove Category</span>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '1.25rem' }}>
                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        style={{ borderRadius: '999px', padding: '0.7rem 1.2rem', border: 'none', background: '#ffa305', color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' }}
                                    >
                                        <Plus size={16} />
                                        <span>Add Category</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsTimingsOpen(!isTimingsOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>Timings</div>
                    <motion.div animate={{ rotate: isTimingsOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isTimingsOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                                    {['24 hrs', 'AM/PM'].map(f => (
                                        <button
                                            key={f}
                                            type="button"
                                            onClick={() => handleTimeFormatChange(f)}
                                            style={{ padding: '0.55rem 1.25rem', borderRadius: '999px', border: timeFormat === f ? '1px solid rgba(255,163,5,0.8)' : '1px solid #334155', background: timeFormat === f ? 'rgba(255,163,5,0.1)' : '#020617', color: timeFormat === f ? '#ffa305' : '#94a3b8', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {timings.map((day, idx) => (
                                        <div key={day.day} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingBottom: '1rem', borderBottom: '1px solid #1e293b' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleTimingChange(idx, 'isOpen', !day.isOpen)}
                                                    style={{ width: 26, height: 26, borderRadius: 999, border: `2px solid ${day.isOpen ? '#22c55e' : '#334155'}`, background: day.isOpen ? '#22c55e' : '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                >
                                                    {day.isOpen && <Check size={16} color="#022c22" strokeWidth={4} />}
                                                </button>
                                                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#e5e7eb', minWidth: '100px' }}>{day.day}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                                <div style={{ position: 'relative', flex: '1 1 140px' }}>
                                                    <label style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Open</label>
                                                    <input
                                                        type="text"
                                                        value={day.start}
                                                        disabled={!day.isOpen}
                                                        onChange={(e) => handleTimingChange(idx, 'start', e.target.value)}
                                                        style={{ width: '100%', padding: '0.75rem 1rem', paddingRight: '2.5rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', color: day.isOpen ? '#e5e7eb' : '#6b7280', background: '#020617', outline: 'none' }}
                                                        placeholder="08:00 AM"
                                                    />
                                                    <Clock size={16} color="#64748b" style={{ position: 'absolute', right: '1rem', top: 'calc(50% + 8px)', transform: 'translateY(-50%)', opacity: 0.8 }} />
                                                </div>
                                                <div style={{ position: 'relative', flex: '1 1 140px' }}>
                                                    <label style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Close</label>
                                                    <input
                                                        type="text"
                                                        value={day.end}
                                                        disabled={!day.isOpen}
                                                        onChange={(e) => handleTimingChange(idx, 'end', e.target.value)}
                                                        style={{ width: '100%', padding: '0.75rem 1rem', paddingRight: '2.5rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', color: day.isOpen ? '#e5e7eb' : '#6b7280', background: '#020617', outline: 'none' }}
                                                        placeholder="08:00 AM"
                                                    />
                                                    <Clock size={16} color="#64748b" style={{ position: 'absolute', right: '1rem', top: 'calc(50% + 8px)', transform: 'translateY(-50%)', opacity: 0.8 }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsSocialOpen(!isSocialOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>Social Media</div>
                    <motion.div animate={{ rotate: isSocialOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isSocialOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                    {socials.map((s, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap', border: '1px solid #1e293b', padding: '0.85rem', borderRadius: '12px', background: '#0b1222' }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: getSocialColor(s.id), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {getSocialIcon(s.id)}
                                            </div>
                                            <input
                                                type="text"
                                                value={s.url}
                                                placeholder={s.placeholder}
                                                onChange={(e) => handleSocialChange(idx, e.target.value)}
                                                style={{ flex: '1 1 200px', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                                            />
                                            <button
                                                onClick={() => handleRemoveSocial(idx)}
                                                style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', marginLeft: 'auto', cursor: 'pointer' }}
                                            >
                                                <X size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '1rem' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Add Social</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {availableSocials.map(s => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => handleAddSocial(s.id)}
                                                disabled={!!socials.find(as => as.id === s.id)}
                                                style={{ width: 34, height: 34, borderRadius: 8, background: s.color, border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: socials.find(as => as.id === s.id) ? 'not-allowed' : 'pointer', opacity: socials.find(as => as.id === s.id) ? 0.35 : 1 }}
                                            >
                                                <img src={s.icon} style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {showImageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setShowImageModal(false)}
                    >
                        <motion.img
                            src={design.backgroundImage}
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <ImageUploadModal
                isOpen={isBgModalOpen}
                onClose={() => { setIsBgModalOpen(false); setTempBgImage(null); }}
                onSave={(url) => handleDesignSectionUpdate('backgroundImage', url)}
                tempImage={tempBgImage}
                fileName={bgFileName}
                type="image"
            />
        </div>
    );
};

export default MenuConfig;
