import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, UploadCloud, X, RefreshCw, Check, Image as ImageIcon, Plus, ArrowUpDown, Trash2, Clock, Globe, Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, Music, Send, MapPin, Link as LinkIcon, Hash } from 'lucide-react';
import ReusableDesignAccordion from './ReusableDesignAccordion';
import axios from 'axios';

const MenuConfig = ({ config, onChange }) => {
    // Accordion States
    const [isDesignOpen, setIsDesignOpen] = useState(false);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTimingsOpen, setIsTimingsOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(true);

    // Sub-accordion state for Menu Categories
    const [openCategoryId, setOpenCategoryId] = useState('juices');

    const design = config.design || {};
    const businessInfo = config.businessInfo || {};

    // Initial State handling for Categories - use saved data if available
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

    // Update timings when config changes (for edit mode)
    useEffect(() => {
        if (businessInfo?.timings && Array.isArray(businessInfo.timings) && businessInfo.timings.length > 0) {
            setTimings(businessInfo.timings);
        }
        if (businessInfo?.timeFormat) {
            setTimeFormat(businessInfo.timeFormat);
        }
    }, [businessInfo?.timings, businessInfo?.timeFormat]);

    // Social Media State
    // Initializing with Website, Facebook, Instagram as requested
    const [socials, setSocials] = useState([
        { id: 'website', name: 'Website', icon: 'globe', placeholder: 'https://', url: '' },
        { id: 'facebook', name: 'Facebook', icon: 'facebook', placeholder: 'https://', url: '' },
        { id: 'instagram', name: 'Instagram', icon: 'instagram', placeholder: 'https://', url: '' }
    ]);

    // Available Social Icons Map
    const availableSocials = [
        { id: 'facebook', color: '#1877F2', icon: <Facebook size={20} color="#fff" fill="#fff" /> },
        { id: 'instagram', color: '#E4405F', icon: <Instagram size={20} color="#fff" /> },
        { id: 'twitter', color: '#000000', icon: <Twitter size={20} color="#fff" fill="#fff" /> },
        { id: 'linkedin', color: '#0A66C2', icon: <Linkedin size={20} color="#fff" fill="#fff" /> },
        { id: 'discord', color: '#5865F2', icon: <Hash size={20} color="#fff" /> }, // Simulating Discord
        { id: 'twitch', color: '#9146FF', icon: <Hash size={20} color="#fff" /> }, // Simulating Twitch
        { id: 'youtube', color: '#FF0000', icon: <Youtube size={20} color="#fff" fill="#fff" /> },
        { id: 'whatsapp', color: '#25D366', icon: <MessageCircle size={20} color="#fff" fill="#fff" /> },
        { id: 'snapchat', color: '#FFFC00', icon: <Hash size={20} color="#fff" /> }, // Simulating Snap
        { id: 'tiktok', color: '#000000', icon: <Music size={20} color="#fff" /> }, // Simulating TikTok
        { id: 'tumblr', color: '#36465D', icon: <Hash size={20} color="#fff" /> },
        { id: 'spotify', color: '#1DB954', icon: <Music size={20} color="#fff" /> },
        { id: 'pinterest', color: '#BD081C', icon: <Hash size={20} color="#fff" /> },
        { id: 'telegram', color: '#0088CC', icon: <Send size={20} color="#fff" fill="#fff" /> },
        { id: 'reddit', color: '#FF4500', icon: <Hash size={20} color="#fff" /> },
        { id: 'website', color: '#4F46E5', icon: <Globe size={20} color="#fff" /> }
    ];

    const handleSocialChange = (index, value) => {
        const newSocials = [...socials];
        newSocials[index].url = value;
        setSocials(newSocials);
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, socials: newSocials } }));
    };

    const handleAddSocial = (id) => {
        if (socials.find(s => s.id === id)) return; // Already added
        const newItem = { id, name: id.charAt(0).toUpperCase() + id.slice(1), url: '', placeholder: 'https://' };
        setSocials([...socials, newItem]);
    };

    const handleRemoveSocial = (index) => {
        const newSocials = socials.filter((_, i) => i !== index);
        setSocials(newSocials);
    };

    // Standard Handlers
    const handleTimingChange = (index, field, value) => {
        const newTimings = [...timings];
        newTimings[index][field] = value;
        setTimings(newTimings);
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, timings: newTimings } }));
    };

    const handleTimeFormatChange = (format) => {
        setTimeFormat(format);
        onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, timeFormat: format } }));
        
        // Remove AM/PM from all timings if switching to 24 hrs
        if (format === '24 hrs') {
            const updatedTimings = timings.map(t => ({
                ...t,
                start: t.start ? t.start.replace(/\s*(AM|PM|am|pm)/i, '').trim() : t.start,
                end: t.end ? t.end.replace(/\s*(AM|PM|am|pm)/i, '').trim() : t.end
            }));
            setTimings(updatedTimings);
            onChange(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, timings: updatedTimings, timeFormat: format } }));
        }
    };

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
    }

    const handleRemoveProduct = (catId, prodId) => {
        const newCats = categories.map(c => {
            if (c.id === catId) {
                return { ...c, products: c.products.filter(p => p.id !== prodId) };
            }
            return c;
        });
        updateCategories(newCats);
    }

    const handleRemoveCategory = (catId) => {
        const newCategories = categories.filter(c => c.id !== catId);
        updateCategories(newCategories);
        // If deleted category was open, close it
        if (openCategoryId === catId) {
            setOpenCategoryId(newCategories.length > 0 ? newCategories[0].id : null);
        }
    };

    const handleProductImageUpload = async (catId, prodId, file) => {
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await axios.post('http://localhost:3000/api/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Update product image
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
        if (openCategoryId === id) setOpenCategoryId(null);
        else setOpenCategoryId(id);
    };

    const primaryColor = design.primaryColor || '#6F0101';
    const secondaryColor = design.secondaryColor || '#FFFFFF';

    const handleDesignUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            design: { ...prev.design, [key]: value }
        }));
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

    const handleColorPaletteClick = (primary, secondary) => {
        onChange(prev => ({
            ...prev,
            design: { ...prev.design, primaryColor: primary, secondaryColor: secondary }
        }));
    };

    const palettes = [{ p: '#0f296d', s: '#f59e0b' }, { p: '#fef08a', s: '#fffbeb' }, { p: '#8b5cf6', s: '#c4b5fd' }, { p: '#16a34a', s: '#86efac' }, { p: '#06b6d4', s: '#67e8f9' }];
    const bgImages = [{ id: '1', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' }, { id: '2', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400' }, { id: '3', url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400' }, { id: '4', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400' }, { id: '5', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400' }];
    const logos = [{ id: '1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }, { id: '2', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Food' }, { id: '3', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' }];

    const getSocialIcon = (id) => {
        const item = availableSocials.find(s => s.id === id);
        return item ? item.icon : <Globe size={20} color="#fff" />;
    };

    const getSocialColor = (id) => {
        const item = availableSocials.find(s => s.id === id);
        return item ? item.color : '#94a3b8';
    };

    return (
        <div>
            {/* DESIGN ACCORDION - Compacted */}
            {/* DESIGN ACCORDION - Compacted */}
            <ReusableDesignAccordion
                design={{
                    ...design,
                    primaryColor: design.primaryColor || '#6F0101',
                    secondaryColor: design.secondaryColor || '#FFFFFF'
                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'primaryColor', secondary: 'secondaryColor' }}
                palettes={palettes}
                logoKey="logo"
                showLogo={true}
                logoLabel="LOGO"
                logoOptions={logos}
            >
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>BACKGROUND IMAGE</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        <div onClick={() => handleDesignSectionUpdate('backgroundImage', '')} style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <X size={32} color="#e2e8f0" />
                        </div>
                        {bgImages.map(img => (
                            <div key={img.id} onClick={() => handleDesignSectionUpdate('backgroundImage', img.url)} style={{ width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', border: design.backgroundImage === img.url ? '2px solid #8b5cf6' : '1px solid #e2e8f0' }}>
                                <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                        <div style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <UploadCloud size={24} color="#94a3b8" />
                        </div>
                    </div>
                </div>
            </ReusableDesignAccordion>

            {/* BASIC INFORMATION - Compacted */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)} style={{ padding: '1.5rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: isBasicInfoOpen ? '1px solid #e2e8f0' : 'none' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>BASIC INFORMATION</div>
                    {isBasicInfoOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>
                {isBasicInfoOpen && (
                    <div style={{ padding: '2rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>RESTAURANT NAME*</label><input type="text" value={businessInfo.title || ''} onChange={e => handleBusinessInfoUpdate('title', e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #1e293b', borderRadius: '4px' }} /></div>
                        <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>TITLE*</label><input type="text" value={businessInfo.subtitle || ''} onChange={e => handleBusinessInfoUpdate('subtitle', e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #1e293b', borderRadius: '4px' }} /></div>
                        <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>DESCRIPTION</label><textarea value={businessInfo.description || ''} onChange={e => handleBusinessInfoUpdate('description', e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #1e293b', borderRadius: '4px' }} /></div>
                        <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>WEBSITE*</label><input type="text" value={businessInfo.website || ''} onChange={e => handleBusinessInfoUpdate('website', e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #1e293b', borderRadius: '4px' }} /></div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>CURRENCY</label>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                <div 
                                    onClick={() => handleBusinessInfoUpdate('currency', '$')} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid #8b5cf6',
                                        background: (businessInfo?.currency || '$') === '$' ? '#8b5cf6' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {(businessInfo?.currency || '$') === '$' && (
                                            <div style={{
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                background: '#fff'
                                            }}></div>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>$</span>
                                </div>
                                <div 
                                    onClick={() => handleBusinessInfoUpdate('currency', 'PKR')} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid #8b5cf6',
                                        background: businessInfo?.currency === 'PKR' ? '#8b5cf6' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {businessInfo?.currency === 'PKR' && (
                                            <div style={{
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                background: '#fff'
                                            }}></div>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>PKR</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>NO OF TABLES*</label><input type="number" value={businessInfo.tables || ''} onChange={e => handleBusinessInfoUpdate('tables', e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #1e293b', borderRadius: '4px' }} /></div>
                    </div>
                )}
            </div>

            {/* MENU ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ padding: '1.5rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: isMenuOpen ? '1px solid #e2e8f0' : 'none' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>MENU</div>
                    {isMenuOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isMenuOpen && (
                    <div style={{ padding: '2rem', background: '#faf9fc', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {categories.map((cat) => (
                                <div key={cat.id} style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <div
                                        onClick={() => toggleCategory(cat.id)}
                                        style={{
                                            background: '#fff', padding: '1rem 1.5rem', display: 'flex',
                                            justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                                            fontWeight: 'bold', color: '#0f172a', fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            borderBottom: openCategoryId === cat.id ? '1px solid #f1f5f9' : 'none'
                                        }}
                                    >
                                        {cat.name || 'New Category'}
                                        {openCategoryId === cat.id ? <ChevronUp size={18} color="#0f172a" /> : <ChevronDown size={18} color="#0f172a" />}
                                    </div>

                                    {openCategoryId === cat.id && (
                                        <div style={{ background: '#fff', padding: '2rem 1.5rem' }}>
                                            <div style={{ marginBottom: '2rem', position: 'relative' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase' }}>CATEGORY NAME*</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <input type="text" value={cat.name} onChange={(e) => handleCategoryNameChange(cat.id, e.target.value)} style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '1rem', outline: 'none' }} />
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <div 
                                                            onClick={() => handleRemoveCategory(cat.id)}
                                                            style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                        >
                                                            <X size={16} color="#94a3b8" />
                                                        </div>
                                                        <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowUpDown size={20} color="#cbd5e1" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            {cat.products.map((prod, idx) => (
                                                <div key={prod.id} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                    <div style={{ width: '80px', paddingTop: '1rem' }}><span style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>PRODUCT {idx + 1}:</span></div>
                                                    <div style={{ flex: 1, background: '#f6f5ff', padding: '1.5rem', borderRadius: '8px', position: 'relative' }}>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                            <div><label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase' }}>PRODUCT NAME*</label><input type="text" value={prod.name} placeholder="Zinger Burger" onChange={(e) => handleProductChange(cat.id, prod.id, 'name', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '0.9rem', outline: 'none', background: '#fff' }} /></div>
                                                            <div><label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase' }}>PRICE*</label><input type="text" value={prod.price} placeholder="10" onChange={(e) => handleProductChange(cat.id, prod.id, 'price', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '0.9rem', outline: 'none', background: '#fff' }} /></div>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                                                            <div><label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase' }}>DESCRIPTION</label><textarea value={prod.description} placeholder="jalapeno + cheese" onChange={(e) => handleProductChange(cat.id, prod.id, 'description', e.target.value)} rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '0.9rem', outline: 'none', background: '#fff', resize: 'none' }} /></div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                {prod.image && (
                                                                    <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                                        <img 
                                                                            src={prod.image} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} 
                                                                        />
                                                                    </div>
                                                                )}
                                                                <label style={{ width: '50px', height: '50px', borderRadius: '4px', border: '1px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#f8fafc' }}>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        style={{ display: 'none' }}
                                                                        onChange={(e) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                handleProductImageUpload(cat.id, prod.id, file);
                                                                            }
                                                                            e.target.value = '';
                                                                        }}
                                                                    />
                                                                    <UploadCloud size={20} color="#94a3b8" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div style={{ position: 'absolute', right: '-40px', top: '0', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }}>
                                                            <div 
                                                                onClick={() => handleRemoveProduct(cat.id, prod.id)}
                                                                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff' }}
                                                            >
                                                                <X size={14} color="#94a3b8" />
                                                            </div>
                                                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowUpDown size={18} color="#cbd5e1" /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => handleAddProduct(cat.id)} style={{ background: '#fff', border: '1px solid #8b5cf6', color: '#8b5cf6', padding: '0.75rem 1.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', marginTop: '1rem' }}><Plus size={16} /> Add More Product</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button onClick={handleAddCategory} style={{ background: '#fff', border: '1px solid #8b5cf6', color: '#8b5cf6', padding: '0.5rem 1rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }}><Plus size={16} /> Add Category</button>
                        </div>
                    </div>
                )}
            </div>

            {/* TIMINGS ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div onClick={() => setIsTimingsOpen(!isTimingsOpen)} style={{ padding: '1.5rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: isTimingsOpen ? '1px solid #e2e8f0' : 'none' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>TIMINGS</div>
                    {isTimingsOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isTimingsOpen && (
                    <div style={{ padding: '2rem', background: '#faf9fc' }}>
                        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '2rem' }}>
                                <button onClick={() => handleTimeFormatChange('24 hrs')} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: timeFormat === '24 hrs' ? '1px solid #8b5cf6' : '1px solid #e2e8f0', color: timeFormat === '24 hrs' ? '#8b5cf6' : '#94a3b8', background: '#fff', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>24 hrs</button>
                                <button onClick={() => handleTimeFormatChange('AM/PM')} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: timeFormat === 'AM/PM' ? '1px solid #8b5cf6' : '1px solid #e2e8f0', color: timeFormat === 'AM/PM' ? '#8b5cf6' : '#94a3b8', background: '#fff', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>AM/PM</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {timings.map((day, ix) => (
                                    <div key={day.day} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div onClick={() => handleTimingChange(ix, 'isOpen', !day.isOpen)} style={{ width: '20px', height: '20px', borderRadius: '4px', background: day.isOpen ? '#06b6d4' : '#fff', border: day.isOpen ? 'none' : '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{day.isOpen && <Check size={14} color="#fff" strokeWidth={3} />}</div>
                                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>{day.day}</span>
                                        </div>
                                        <div style={{ position: 'relative' }}><input type="text" value={day.start} onChange={(e) => handleTimingChange(ix, 'start', e.target.value)} style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', color: '#334155' }} /><div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Clock size={16} color="#cbd5e1" /></div></div>
                                        <div style={{ position: 'relative' }}><input type="text" value={day.end} onChange={(e) => handleTimingChange(ix, 'end', e.target.value)} style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', color: '#334155' }} /><div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Clock size={16} color="#cbd5e1" /></div></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* SOCIAL MEDIA CHANNELS */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div onClick={() => setIsSocialOpen(!isSocialOpen)} style={{ padding: '1.5rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: isSocialOpen ? '1px solid #e2e8f0' : 'none' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>SOCIAL MEDIA CHANNELS</div>
                    {isSocialOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isSocialOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>
                        {/* Active Inputs Grid */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
                            {socials.map((social, index) => (
                                <div key={index} style={{ width: '45%', position: 'relative' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 'bold' }}>{social.name}*</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '24px', height: '24px', borderRadius: '4px', background: getSocialColor(social.id), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {getSocialIcon(social.id)}
                                        </div>
                                        <input
                                            type="text"
                                            value={social.url}
                                            placeholder={social.placeholder}
                                            onChange={(e) => handleSocialChange(index, e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem', paddingLeft: '3rem', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '0.9rem', outline: 'none' }}
                                        />
                                    </div>

                                    {/* Action Icons Outside */}
                                    <div style={{ position: 'absolute', right: '-35px', top: '32px', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                        <div onClick={() => handleRemoveSocial(index)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #e2e8f0' }}>
                                            <X size={12} color="#94a3b8" />
                                        </div>
                                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                                            <ArrowUpDown size={16} color="#cbd5e1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ADD MORE */}
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.2rem', textTransform: 'uppercase' }}>ADD MORE</div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Click on the icon to add a social media profile.</div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {availableSocials.map((s) => {
                                    const isSelected = socials.some(active => active.id === s.id);
                                    return (
                                        <div
                                            key={s.id}
                                            onClick={() => handleAddSocial(s.id)}
                                            style={{
                                                width: '40px', height: '40px', borderRadius: '8px',
                                                background: s.color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer',
                                                border: isSelected ? '3px solid #8b5cf6' : '2px solid transparent',
                                                boxShadow: isSelected ? '0 0 0 2px #fff inset' : 'none',
                                                opacity: isSelected ? 0.8 : 1
                                            }}
                                        >
                                            {s.icon}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default MenuConfig;
