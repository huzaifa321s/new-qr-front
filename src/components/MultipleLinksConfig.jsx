import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Plus, Facebook, Instagram, Twitter, Linkedin, Github, Youtube, Globe, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const MultipleLinksConfig = ({ config, onChange, errors = {}, setErrors }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);

    const [isLinksOpen, setIsLinksOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const links = config.links || [
        { id: '1', url: '', title: 'Visit Us Online' },
        { id: '2', url: '', title: 'Talk to Us' },
        { id: '3', url: '', title: 'Instagram' },
        { id: '4', url: '', title: 'Youtube' }
    ];
    const socialLinks = config.socialLinks || [
        { id: 's1', platform: 'website', url: '' },
        { id: 's2', platform: 'facebook', url: '' },
        { id: 's3', platform: 'instagram', url: '' }
    ];

    const primaryColor = design.color?.header || '#52BDA3'; // Matching screenshot approx
    const secondaryColor = design.color?.light || '#2B1E99'; // Matching screenshot approx

    // Handler functions
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

    const handleBasicInfoUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            basicInfo: {
                ...prev.basicInfo,
                [key]: value
            }
        }));
        // Clear error when user updates a basic info field
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    const handleLinkUpdate = (id, field, value) => {
        const newLinks = links.map(link =>
            link.id === id ? { ...link, [field]: value } : link
        );
        onChange(prev => ({ ...prev, links: newLinks }));
        // Clear specific error for this link field
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (newErrors.links && typeof newErrors.links === 'object') {
                    const newLinkErrors = { ...newErrors.links };
                    if (newLinkErrors[id]) {
                        const itemErrors = { ...newLinkErrors[id] };
                        delete itemErrors[field];
                        if (Object.keys(itemErrors).length === 0) {
                            delete newLinkErrors[id];
                        } else {
                            newLinkErrors[id] = itemErrors;
                        }

                        if (Object.keys(newLinkErrors).length === 0) {
                            delete newErrors.links;
                        } else {
                            newErrors.links = newLinkErrors;
                        }
                    }
                }
                return newErrors;
            });
        }
    };

    const handleAddLink = () => {
        const newLink = { id: Date.now().toString(), url: '', title: '' };
        onChange(prev => ({ ...prev, links: [...links, newLink] }));
        // Clear general links error when a link is added
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (typeof newErrors.links === 'string') {
                    delete newErrors.links;
                }
                return newErrors;
            });
        }
    };

    const handleRemoveLink = (id) => {
        const newLinks = links.filter(link => link.id !== id);
        onChange(prev => ({ ...prev, links: newLinks }));
        // Clear specific error for this removed link
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (newErrors.links && typeof newErrors.links === 'object') {
                    const newLinkErrors = { ...newErrors.links };
                    delete newLinkErrors[id];
                    if (Object.keys(newLinkErrors).length === 0) {
                        delete newErrors.links;
                    } else {
                        newErrors.links = newLinkErrors;
                    }
                }
                return newErrors;
            });
        }
    };

    const handleSocialLinkAdd = (platformId) => {
        onChange(prev => {
            const currentSocialLinks = prev.socialLinks || [];
            const existingLink = currentSocialLinks.find(link => link.platform === platformId);

            if (existingLink) {
                // Remove if already exists (Toggle Off)
                return {
                    ...prev,
                    socialLinks: currentSocialLinks.filter(link => link.platform !== platformId)
                };
            } else {
                // Add if it doesn't exist (Toggle On)
                const newLink = {
                    id: Date.now().toString(),
                    platform: platformId,
                    url: ''
                };
                return {
                    ...prev,
                    socialLinks: [...currentSocialLinks, newLink]
                };
            }
        });
        // Clear general socialLinks error when a channel is added or toggled
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.socialLinks;
                return newErrors;
            });
        }
    };

    const handleSocialLinkUpdate = (id, value) => {
        const newLinks = socialLinks.map(link =>
            link.id === id ? { ...link, url: value } : link
        );
        onChange(prev => ({ ...prev, socialLinks: newLinks }));
        // Clear specific error for this social link
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (newErrors.socialLinks && typeof newErrors.socialLinks === 'object') {
                    const newSocialErrors = { ...newErrors.socialLinks };
                    delete newSocialErrors[id];
                    if (Object.keys(newSocialErrors).length === 0) {
                        delete newErrors.socialLinks;
                    } else {
                        newErrors.socialLinks = newSocialErrors;
                    }
                }
                return newErrors;
            });
        }
    };

    const handleSocialLinkRemove = (id) => {
        const newLinks = socialLinks.filter(link => link.id !== id);
        onChange(prev => ({ ...prev, socialLinks: newLinks }));
        // Clear specific error for this social link
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (newErrors.socialLinks && typeof newErrors.socialLinks === 'object') {
                    const newSocialErrors = { ...newErrors.socialLinks };
                    delete newSocialErrors[id];
                    if (Object.keys(newSocialErrors).length === 0) {
                        delete newErrors.socialLinks;
                    } else {
                        newErrors.socialLinks = newSocialErrors;
                    }
                }
                return newErrors;
            });
        }
    };

    // Share Handlers
    const handleShareUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            share: {
                ...prev.share,
                [key]: value
            }
        }));
    };

    const socialPlatforms = [
        { id: 'website', icon: 'https://img.icons8.com/color/48/domain.png', color: '#4B5563', name: 'Website' },
        { id: 'facebook', icon: 'https://img.icons8.com/color/48/facebook-new.png', color: '#1877F2', name: 'Facebook' },
        { id: 'instagram', icon: 'https://img.icons8.com/color/48/instagram-new--v1.png', color: '#E4405F', name: 'Instagram' },
        { id: 'twitter', icon: 'https://img.icons8.com/color/48/twitterx--v1.png', color: '#000000', name: 'X (Twitter)' },
        { id: 'linkedin', icon: 'https://img.icons8.com/color/48/linkedin.png', color: '#0A66C2', name: 'LinkedIn' },
        { id: 'youtube', icon: 'https://img.icons8.com/color/48/youtube-play.png', color: '#FF0000', name: 'YouTube' },
        { id: 'whatsapp', icon: 'https://img.icons8.com/color/48/whatsapp--v1.png', color: '#25D366', name: 'WhatsApp' },
        { id: 'snapchat', icon: 'https://img.icons8.com/color/48/snapchat--v1.png', color: '#FFFC00', name: 'Snapchat' },
        { id: 'tiktok', icon: 'https://img.icons8.com/color/48/tiktok--v1.png', color: '#000000', name: 'TikTok' },
        { id: 'spotify', icon: 'https://img.icons8.com/color/48/spotify--v1.png', color: '#1DB954', name: 'Spotify' },
        { id: 'pinterest', icon: 'https://img.icons8.com/color/48/pinterest.png', color: '#BD081C', name: 'Pinterest' },
        { id: 'telegram', icon: 'https://img.icons8.com/color/48/telegram-app.png', color: '#0088CC', name: 'Telegram' },
        { id: 'line', icon: 'https://img.icons8.com/color/48/line-me.png', color: '#00B900', name: 'Line' }
    ];



    const palettes = [
        { p: '#0B2D86', s: '#FFA800' }, // Dark Blue / Orange
        { p: '#FFFF00', s: '#FFFFE0' }, // Yellow
        { p: '#8B5CF6', s: '#C4B5FD' }, // Purple
        { p: '#16A34A', s: '#86EFAC' }, // Green
        { p: '#06B6D4', s: '#67E8F9' }  // Cyan
    ];

    const logoOptions = [
        { id: 'logo1', url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop' }, // Avatar placeholder
        { id: 'logo2', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop' }, // Food placeholder
        { id: 'logo3', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' }, // Doctor/Professional placeholder
        { id: 'logo4', url: 'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=150&h=150&fit=crop' }  // Box/Product placeholder (simulating the selected one)
    ];

    return (
        <div>
            {/* DESIGN ACCORDION */}
            <ReusableDesignAccordion
                design={{
                    ...design,
                    color: {
                        ...design.color,
                        header: design.color?.header || '#52BDA3',
                        light: design.color?.light || '#2B1E99'
                    },
                    logo: {
                        ...design.logo,
                        url: design.logo?.url
                    }
                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'color.header', secondary: 'color.light' }}
                palettes={palettes}
                logoKey="logo.url"
                logoOptions={logoOptions}
                logoLabel="LOGO"
                logoHelpText="128x128px, 1:1 Ratio"
            />

            {/* BASIC INFORMATION ACCORDION */}
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
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>BASIC INFORMATION</div>
                    </div>
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
                            style={{ borderTop: '1px solid #334155', background: '#0f172a' }}
                        >
                            <div style={{ padding: '1rem' }}>

                                {/* HEADLINE FIELD */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        HEADLINE*
                                    </label>
                                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: '1rem' }}>
                                        {/* Headline Input */}
                                        <div>
                                            <input
                                                type="text"
                                                value={basicInfo.headline || ''}
                                                onChange={(e) => handleBasicInfoUpdate('headline', e.target.value)}
                                                placeholder="Techoid"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '10px',
                                                    border: `1px solid ${errors.headline ? '#ef4444' : '#334155'}`,
                                                    fontSize: '0.9rem',
                                                    outline: 'none',
                                                    background: '#020617',
                                                    color: '#e5e7eb'
                                                }}
                                            />
                                            {errors.headline && (
                                                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: '0' }}>
                                                    {errors.headline}
                                                </p>
                                            )}
                                        </div>

                                        {/* Text Color */}
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                Text Color
                                            </label>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid #334155',
                                                borderRadius: '10px',
                                                padding: '0.5rem',
                                                height: '44px',
                                                background: '#020617'
                                            }}>
                                                <input
                                                    type="text"
                                                    value={basicInfo.headlineColor || '#2B1E99'}
                                                    onChange={(e) => handleBasicInfoUpdate('headlineColor', e.target.value)}
                                                    style={{
                                                        border: 'none',
                                                        outline: 'none',
                                                        width: '100%',
                                                        fontSize: '0.85rem',
                                                        color: '#e5e7eb',
                                                        fontWeight: '500',
                                                        textTransform: 'uppercase',
                                                        background: 'transparent'
                                                    }}
                                                />
                                                <div style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    background: basicInfo.headlineColor || '#2B1E99',
                                                    borderRadius: '4px',
                                                    flexShrink: 0,
                                                    border: '1px solid #334155',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer'
                                                }}>
                                                    <input
                                                        type="color"
                                                        value={basicInfo.headlineColor || '#2B1E99'}
                                                        onChange={(e) => handleBasicInfoUpdate('headlineColor', e.target.value)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '-50%',
                                                            left: '-50%',
                                                            width: '200%',
                                                            height: '200%',
                                                            cursor: 'pointer',
                                                            opacity: 0,
                                                            padding: 0,
                                                            margin: 0
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Font */}
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                Font
                                            </label>
                                            <select
                                                value={basicInfo.headlineFont || 'Lato'}
                                                onChange={(e) => handleBasicInfoUpdate('headlineFont', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '10px',
                                                    border: '1px solid #334155',
                                                    fontSize: '0.9rem',
                                                    outline: 'none',
                                                    cursor: 'pointer',
                                                    background: '#020617',
                                                    color: '#e5e7eb'
                                                }}
                                            >
                                                <option value="Lato">Lato</option>
                                                <option value="Roboto">Roboto</option>
                                                <option value="Open Sans">Open Sans</option>
                                                <option value="Montserrat">Montserrat</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* ABOUT US FIELD */}
                                <div style={{ marginBottom: '0' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        ABOUT US
                                    </label>
                                    <textarea
                                        value={basicInfo.aboutUs || ''}
                                        onChange={(e) => handleBasicInfoUpdate('aboutUs', e.target.value)}
                                        placeholder="Follow us and get updates delivered to your favorite social media channel."
                                        rows={3}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* LINKS ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsLinksOpen(!isLinksOpen)}
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
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>LINKS</div>
                    </div>
                    <motion.div animate={{ rotate: isLinksOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isLinksOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#0f172a' }}
                        >
                            <div style={{ padding: '1rem' }}>

                                {/* General Links Error */}
                                {typeof errors.links === 'string' && (
                                    <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                                        {errors.links}
                                    </div>
                                )}

                                {links.map((link) => (
                                    <div key={link.id} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', alignItems: 'start' }}>
                                        {/* URL Input */}
                                        <div style={{ position: 'relative' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                                URL*
                                            </label>
                                            <input
                                                type="text"
                                                value={link.url}
                                                onChange={(e) => handleLinkUpdate(link.id, 'url', e.target.value)}
                                                placeholder="https://"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '10px',
                                                    border: `1px solid ${errors.links && errors.links[link.id]?.url ? '#ef4444' : '#334155'}`,
                                                    fontSize: '0.9rem',
                                                    outline: 'none',
                                                    background: '#020617',
                                                    color: '#e5e7eb'
                                                }}
                                            />
                                            {errors.links && errors.links[link.id]?.url && (
                                                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                                    {errors.links[link.id].url}
                                                </p>
                                            )}
                                        </div>

                                        {/* Link Title Input & Delete */}
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                            <div style={{ flex: 1, position: 'relative' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                                    LINK TITLE*
                                                </label>
                                                <input
                                                    type="text"
                                                    value={link.title}
                                                    onChange={(e) => handleLinkUpdate(link.id, 'title', e.target.value)}
                                                    placeholder="Visit Us Online"
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        borderRadius: '10px',
                                                        border: `1px solid ${errors.links && errors.links[link.id]?.title ? '#ef4444' : '#334155'}`,
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        background: '#020617',
                                                        color: '#e5e7eb'
                                                    }}
                                                />
                                                {errors.links && errors.links[link.id]?.title && (
                                                    <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                                        {errors.links[link.id].title}
                                                    </p>
                                                )}
                                            </div>
                                            <div
                                                onClick={() => handleRemoveLink(link.id)}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    border: '1px solid #334155',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    flexShrink: 0,
                                                    marginTop: '2.2rem',
                                                    background: '#020617'
                                                }}
                                            >
                                                <X size={14} color="#ef4444" />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Add More Links Button */}
                                <button
                                    onClick={handleAddLink}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ffa305',
                                        background: 'rgba(255, 163, 5, 0.1)',
                                        color: '#ffa305',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        marginTop: '1rem'
                                    }}
                                >
                                    <Plus size={18} />
                                    Add More Links
                                </button>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* SOCIAL MEDIA CHANNELS ACCORDION */}
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
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>SOCIAL MEDIA CHANNELS</div>
                    </div>
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
                            style={{ borderTop: '1px solid #334155', background: '#0f172a' }}
                        >
                            <div style={{ padding: '1rem' }}>

                                {/* General Social Error */}
                                {typeof errors.socialLinks === 'string' && (
                                    <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                                        {errors.socialLinks}
                                    </div>
                                )}

                                {/* Selected Social Channels */}
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1rem' : '2rem', marginBottom: socialLinks.length > 0 ? '2.5rem' : '0' }}>
                                    {socialLinks.map((link) => {
                                        const platform = socialPlatforms.find(p => p.id === link.platform) || socialPlatforms[0];
                                        const Icon = platform.icon;

                                        return (
                                            <div key={link.id}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8' }}>
                                                        {platform.name}*
                                                    </label>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    border: '1px solid #334155',
                                                    borderRadius: '10px',
                                                    height: '44px',
                                                    overflow: 'hidden',
                                                    background: '#020617'
                                                }}>
                                                    <div style={{
                                                        width: '44px',
                                                        height: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRight: '1px solid #334155',
                                                        background: 'transparent'
                                                    }}>
                                                        {typeof Icon === 'string' ? (
                                                            <img
                                                                src={Icon}
                                                                alt=""
                                                                style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    objectFit: 'contain'
                                                                }}
                                                            />
                                                        ) : (
                                                            <Icon size={20} color="#e5e7eb" />
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={link.url}
                                                        onChange={(e) => handleSocialLinkUpdate(link.id, e.target.value)}
                                                        placeholder="https://"
                                                        style={{
                                                            flex: 1,
                                                            height: '100%',
                                                            border: 'none',
                                                            padding: '0 1rem',
                                                            outline: 'none',
                                                            color: '#e5e7eb',
                                                            fontSize: '0.9rem',
                                                            background: 'transparent',
                                                            borderBottom: errors.socialLinks && errors.socialLinks[link.id] ? '2px solid #ef4444' : 'none'
                                                        }}
                                                    />
                                                    {errors.socialLinks && errors.socialLinks[link.id] && (
                                                        <div style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.5rem', width: '100%', paddingLeft: '44px' }}>
                                                            {errors.socialLinks[link.id]}
                                                        </div>
                                                    )}
                                                    <div
                                                        onClick={() => handleSocialLinkRemove(link.id)}
                                                        style={{
                                                            padding: '0 0.5rem',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            height: '100%'
                                                        }}
                                                    >
                                                        <X size={16} color="#ef4444" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Add More Section */}
                                <div style={{ marginTop: '1rem' }}>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        color: '#ffa305',
                                        marginBottom: '0.25rem',
                                        textTransform: 'uppercase'
                                    }}>
                                        ADD MORE
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                        Click on the icon to add a social media profile.
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {socialPlatforms.map((platform) => {
                                            const Icon = platform.icon;
                                            const isSelected = socialLinks.some(link => link.platform === platform.id);
                                            return (
                                                <div
                                                    key={platform.id}
                                                    onClick={() => handleSocialLinkAdd(platform.id)}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '8px',
                                                        background: isSelected ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        border: isSelected ? '1px solid #22c55e' : 'none',
                                                        transition: 'all 0.2s',
                                                        position: 'relative'
                                                    }}
                                                    title={platform.name}
                                                >
                                                    {typeof Icon === 'string' ? (
                                                        <img
                                                            src={Icon}
                                                            alt=""
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                objectFit: 'contain',
                                                                opacity: isSelected ? 0.7 : 1
                                                            }}
                                                        />
                                                    ) : (
                                                        <Icon size={20} color="#e5e7eb" />
                                                    )}
                                                    {isSelected && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '-5px',
                                                            right: '-5px',
                                                            background: '#22c55e',
                                                            borderRadius: '50%',
                                                            width: '18px',
                                                            height: '18px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: '2px solid #fff',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                        }}>
                                                            <Check size={10} color="#fff" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* SHARE ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsShareOpen(!isShareOpen)}
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
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>SHARE</div>
                    </div>
                    <motion.div animate={{ rotate: isShareOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isShareOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#0f172a' }}
                        >
                            <div style={{ padding: '1rem' }}>
                                {/* Share Message */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        SHARE MESSAGE
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={config.share?.message || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 50) {
                                                    handleShareUpdate('message', value);
                                                }
                                            }}
                                            placeholder="Check out my links!"
                                            maxLength={50}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                paddingRight: '3.5rem',
                                                borderRadius: '10px',
                                                border: (config.share?.message || '').length >= 50 ? '1px solid #ef4444' : '1px solid #334155',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                color: '#e5e7eb',
                                                background: '#020617'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            right: '0.75rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            fontSize: '0.75rem',
                                            color: (config.share?.message || '').length >= 50 ? '#ef4444' : '#94a3b8',
                                            fontWeight: '500'
                                        }}>
                                            {(config.share?.message || '').length}/50
                                        </div>
                                    </div>
                                    {(config.share?.message || '').length >= 50 && (
                                        <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: 'bold' }}>
                                            Max characters length is 50
                                        </div>
                                    )}
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                                        This message will be shared along with the mobile preview link.
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </div >
    );
};

export default MultipleLinksConfig;