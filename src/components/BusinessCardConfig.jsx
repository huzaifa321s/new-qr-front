import { ChevronDown, RefreshCw, UploadCloud, X, Check, Phone, Mail, Globe, MapPin, Plus } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const BusinessCardConfig = ({ config, onChange, errors = {}, setErrors }) => {


    const socialPlatforms = [
        { id: 'facebook', name: 'Facebook', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/facebook.png', color: '#1877F2' },
        { id: 'instagram', name: 'Instagram', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/instagram.png', color: '#E4405F' },
        { id: 'twitter', name: 'X', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/twitter.png', color: '#000000' },
        { id: 'linkedin', name: 'LinkedIn', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/linkedin.png', color: '#0A66C2' },
        { id: 'discord', name: 'Discord', icon: 'https://img.icons8.com/color/48/discord-new.png', color: '#5865F2' },
        { id: 'youtube', name: 'YouTube', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/youtube.png', color: '#FF0000' },
        { id: 'whatsapp', name: 'WhatsApp', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/whatsapp.png', color: '#25D366' },
        { id: 'snapchat', name: 'Snapchat', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/snapchat.png', color: '#FFFC00' },
        { id: 'tiktok', name: 'TikTok', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/tiktok.png', color: '#000000' },
        { id: 'spotify', name: 'Spotify', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/spotify.png', color: '#1DB954' },
        { id: 'dribbble', name: 'Dribbble', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/dribbble.png', color: '#EA4C89' },
        { id: 'pinterest', name: 'Pinterest', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/pinterest.png', color: '#BD081C' },
        { id: 'telegram', name: 'Telegram', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/telegram.png', color: '#0088CC' },
        { id: 'reddit', name: 'Reddit', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/reddit.png', color: '#FF4500' },
        { id: 'website', name: 'Website', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/domain.png', color: '#4B5563' },
        { id: 'behance', name: 'Behance', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/behance.png', color: '#1769FF' },
        { id: 'twitch', name: 'Twitch', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/twitch.png', color: '#9146FF' },
        { id: 'line', name: 'Line', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/line.png', color: '#00B900' },
        { id: 'tumblr', name: 'Tumblr', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/tumblr.png', color: '#35465C' }
    ];

    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);
    const [isExchangeOpen, setIsExchangeOpen] = useState(false);

    const design = config.design || {};
    const personalInfo = config.personalInfo || {};
    const contact = config.contact || {};
    const social = config.social || {};
    const exchange = config.exchange || {};

    const primaryColor = design.color?.header || '#0B2D86';
    const secondaryColor = design.color?.light || '#FFA800';

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

    const handleColorUpdate = (colorKey, value) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                color: { ...prev.design.color, [colorKey]: value }
            }
        }));
    };

    const handleColorPaletteClick = (primary, secondary) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                color: { header: primary, dark: primary, light: secondary }
            }
        }));
    };

    const handleProfileUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                profile: { url }
            }
        }));
    };

    const handlePersonalInfoUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [key]: value
            }
        }));
    };

    const handleContactUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                [key]: value
            }
        }));
    };

    const handleSocialUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            social: {
                ...prev.social,
                [key]: value
            }
        }));
        // Clear error when user updates a social media channel
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key]; // Clear field-specific error
                delete newErrors.general; // Clear general error
                return newErrors;
            });
        }
    };

    const handleExchangeUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            exchange: {
                ...prev.exchange,
                [key]: value
            }
        }));
        // Clear error when user updates an exchange contact field
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.exchange;
                return newErrors;
            });
        }
    };

    const deleteContactField = (field) => {
        handleContactUpdate(field, '');
    };

    const deleteSocialField = (field) => {
        handleSocialUpdate(field, '');
    };

    // Custom Fields Handlers
    const handleAddCustomField = () => {
        const customFields = exchange.customFields || [];
        const newField = {
            id: Date.now(),
            type: 'text',
            label: '',
            options: []
        };
        handleExchangeUpdate('customFields', [...customFields, newField]);
    };

    const handleCustomFieldUpdate = (id, key, value) => {
        const customFields = exchange.customFields || [];
        const updatedFields = customFields.map(field =>
            field.id === id ? { ...field, [key]: value } : field
        );
        handleExchangeUpdate('customFields', updatedFields);
    };

    const handleDeleteCustomField = (id) => {
        const customFields = exchange.customFields || [];
        const updatedFields = customFields.filter(field => field.id !== id);
        handleExchangeUpdate('customFields', updatedFields);
    };

    const handleAddOption = (fieldId) => {
        const customFields = exchange.customFields || [];
        const updatedFields = customFields.map(field => {
            if (field.id === fieldId) {
                return { ...field, options: [...(field.options || []), ''] };
            }
            return field;
        });
        handleExchangeUpdate('customFields', updatedFields);
    };

    const handleDeleteOption = (fieldId, optionIndex) => {
        const customFields = exchange.customFields || [];
        const updatedFields = customFields.map(field => {
            if (field.id === fieldId) {
                const newOptions = field.options.filter((_, idx) => idx !== optionIndex);
                return { ...field, options: newOptions };
            }
            return field;
        });
        handleExchangeUpdate('customFields', updatedFields);
    };

    const handleOptionUpdate = (fieldId, optionIndex, value) => {
        const customFields = exchange.customFields || [];
        const updatedFields = customFields.map(field => {
            if (field.id === fieldId) {
                const newOptions = [...(field.options || [])];
                newOptions[optionIndex] = value;
                return { ...field, options: newOptions };
            }
            return field;
        });
        handleExchangeUpdate('customFields', updatedFields);
    };


    const palettes = [
        { p: '#0B2D86', s: '#FFA800' },
        { p: '#FACC15', s: '#FEF9C3' },
        { p: '#8B5CF6', s: '#C4B5FD' },
        { p: '#16A34A', s: '#86EFAC' },
        { p: '#06B6D4', s: '#67E8F9' }
    ];

    const profileImages = [
        { id: 'profile1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { id: 'profile2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' },
        { id: 'profile3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
        { id: 'profile4', url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
    ];

    return (
        <div>
            {/* DESIGN ACCORDION */}
            <ReusableDesignAccordion
                design={{
                    ...design,
                    color: {
                        ...design.color,
                        header: design.color?.header || '#0B2D86',
                        light: design.color?.light || '#FFA800'
                    },
                    profile: {
                        ...design.profile,
                        url: design.profile?.url
                    }
                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'color.header', secondary: 'color.light' }}
                palettes={palettes}
                logoKey="profile.url"
                logoOptions={profileImages}
                logoLabel="YOUR PICTURE"
                logoHelpText="128x128px, 1:1 Ratio"
                logoShapeKey="profile.shape"
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
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>BASIC INFORMATION</div>
                    </div>
                    <motion.div
                        animate={{ rotate: isBasicInfoOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: '1px solid #334155',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#020617'
                        }}
                    >
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

                        {/* NAME */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ flex: '2 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        NAME*
                                    </label>
                                    <input
                                        type="text"
                                        value={personalInfo.name || ''}
                                        onChange={(e) => handlePersonalInfoUpdate('name', e.target.value)}
                                        placeholder="HELLEN GREY"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                </div>
                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        padding: '0.5rem 0.75rem',
                                        height: '44px',
                                        background: '#020617'
                                    }}>
                                        <input
                                            type="text"
                                            value={personalInfo.nameColor || '#000000'}
                                            onChange={(e) => handlePersonalInfoUpdate('nameColor', e.target.value)}
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
                                            width: '28px',
                                            height: '28px',
                                            background: personalInfo.nameColor || '#000000',
                                            borderRadius: '6px',
                                            flexShrink: 0,
                                            border: '1px solid #1e293b',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="color"
                                                value={personalInfo.nameColor || '#000000'}
                                                onChange={(e) => handlePersonalInfoUpdate('nameColor', e.target.value)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-50%',
                                                    left: '-50%',
                                                    width: '200%',
                                                    height: '200%',
                                                    cursor: 'pointer',
                                                    opacity: 0
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ flex: '1 1 100px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={personalInfo.nameFont || 'Lato'}
                                        onChange={(e) => handlePersonalInfoUpdate('nameFont', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            height: '44px',
                                            cursor: 'pointer',
                                            appearance: 'none',
                                            background: `#020617 url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E") no-repeat right 0.75rem center`,
                                            color: '#e5e7eb'
                                        }}
                                    >
                                        <option value="Lato">Lato</option>
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Open Sans">Open Sans</option>
                                        <option value="Work Sans">Work Sans</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* ABOUT */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                ABOUT
                            </label>
                            <textarea
                                value={personalInfo.about || ''}
                                onChange={(e) => handlePersonalInfoUpdate('about', e.target.value)}
                                placeholder="I am a designer & photographer working in International company. I am a designer & photographer working in International company."
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
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

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ flex: '2 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        JOB TITLE
                                    </label>
                                    <input
                                        type="text"
                                        value={personalInfo.title || ''}
                                        onChange={(e) => handlePersonalInfoUpdate('title', e.target.value)}
                                        placeholder="Creative Lead"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                </div>

                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        padding: '0.5rem 0.75rem',
                                        height: '44px',
                                        background: '#020617'
                                    }}>
                                        <input
                                            type="text"
                                            value={personalInfo.titleColor || '#000000'}
                                            onChange={(e) => handlePersonalInfoUpdate('titleColor', e.target.value)}
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
                                            width: '28px',
                                            height: '28px',
                                            background: personalInfo.titleColor || '#000000',
                                            borderRadius: '6px',
                                            flexShrink: 0,
                                            border: '1px solid #1e293b',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="color"
                                                value={personalInfo.titleColor || '#000000'}
                                                onChange={(e) => handlePersonalInfoUpdate('titleColor', e.target.value)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-50%',
                                                    left: '-50%',
                                                    width: '200%',
                                                    height: '200%',
                                                    cursor: 'pointer',
                                                    opacity: 0
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ flex: '1 1 100px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={personalInfo.titleFont || 'Lato'}
                                        onChange={(e) => handlePersonalInfoUpdate('titleFont', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            height: '44px',
                                            cursor: 'pointer',
                                            appearance: 'none',
                                            background: `#020617 url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E") no-repeat right 0.75rem center`,
                                            color: '#e5e7eb'
                                        }}
                                    >
                                        <option value="Lato">Lato</option>
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Open Sans">Open Sans</option>
                                        <option value="Work Sans">Work Sans</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '0' }}>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ flex: '2 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        COMPANY NAME
                                    </label>
                                    <input
                                        type="text"
                                        value={personalInfo.company || ''}
                                        onChange={(e) => handlePersonalInfoUpdate('company', e.target.value)}
                                        placeholder="Techoid"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                </div>

                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        padding: '0.5rem 0.75rem',
                                        height: '44px',
                                        background: '#020617'
                                    }}>
                                        <input
                                            type="text"
                                            value={personalInfo.companyColor || '#000000'}
                                            onChange={(e) => handlePersonalInfoUpdate('companyColor', e.target.value)}
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
                                            width: '28px',
                                            height: '28px',
                                            background: personalInfo.companyColor || '#000000',
                                            borderRadius: '6px',
                                            flexShrink: 0,
                                            border: '1px solid #334155',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="color"
                                                value={personalInfo.companyColor || '#000000'}
                                                onChange={(e) => handlePersonalInfoUpdate('companyColor', e.target.value)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-50%',
                                                    left: '-50%',
                                                    width: '200%',
                                                    height: '200%',
                                                    cursor: 'pointer',
                                                    opacity: 0
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ flex: '1 1 100px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={personalInfo.companyFont || 'Lato'}
                                        onChange={(e) => handlePersonalInfoUpdate('companyFont', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            height: '44px',
                                            cursor: 'pointer',
                                            appearance: 'none',
                                            background: `#020617 url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E") no-repeat right 0.75rem center`,
                                            color: '#e5e7eb'
                                        }}
                                    >
                                        <option value="Lato">Lato</option>
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Open Sans">Open Sans</option>
                                        <option value="Work Sans">Work Sans</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </motion.div>

            {/* CONTACT INFORMATION ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>CONTACT INFORMATION</div>
                    </div>
                    <motion.div
                        animate={{ rotate: isContactOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: '1px solid #334155',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#020617'
                        }}
                    >
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isContactOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>

                        {/* PHONE */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            {contact.phone ? (
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid #334155',
                                        borderRadius: '999px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        background: '#020617'
                                    }}>
                                        <Phone size={20} color="#e5e7eb" />
                                    </div>
                                    <input
                                        type="text"
                                        value={contact.phone || ''}
                                        onChange={(e) => handleContactUpdate('phone', e.target.value)}
                                        placeholder="15555555234"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                    <button
                                        onClick={() => deleteContactField('phone')}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            border: '1px solid #334155',
                                            borderRadius: '999px',
                                            background: '#020617',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            color: '#ef4444'
                                        }}
                                    >
                                        <X size={20} color="#ef4444" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleContactUpdate('phone', ' ')}
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem',
                                        borderRadius: '999px',
                                        border: '1px dashed #334155',
                                        background: '#020617',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        color: '#94a3b8',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Plus size={18} color="#94a3b8" />
                                    Add Phone
                                </button>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            {contact.email ? (
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid #334155',
                                        borderRadius: '999px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        background: '#020617'
                                    }}>
                                        <Mail size={20} color="#e5e7eb" />
                                    </div>
                                    <input
                                        type="text"
                                        value={contact.email || ''}
                                        onChange={(e) => handleContactUpdate('email', e.target.value)}
                                        placeholder="Hellen@gmail.com"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                    <button
                                        onClick={() => deleteContactField('email')}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            border: '1px solid #334155',
                                            borderRadius: '999px',
                                            background: '#020617',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            color: '#ef4444'
                                        }}
                                    >
                                        <X size={20} color="#ef4444" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleContactUpdate('email', ' ')}
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem',
                                        borderRadius: '999px',
                                        border: '1px dashed #334155',
                                        background: '#020617',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        color: '#94a3b8',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Plus size={18} color="#94a3b8" />
                                    Add Email
                                </button>
                            )}
                        </div>

                        {/* WEBSITE */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            {contact.website ? (
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid #334155',
                                        borderRadius: '999px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        background: '#020617'
                                    }}>
                                        <Globe size={20} color="#e5e7eb" />
                                    </div>
                                    <input
                                        type="text"
                                        value={contact.website || ''}
                                        onChange={(e) => handleContactUpdate('website', e.target.value)}
                                        placeholder="https://Hellengrey.com"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                    <button
                                        onClick={() => deleteContactField('website')}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            border: '1px solid #334155',
                                            borderRadius: '999px',
                                            background: '#020617',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            color: '#ef4444'
                                        }}
                                    >
                                        <X size={20} color="#ef4444" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleContactUpdate('website', ' ')}
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem',
                                        borderRadius: '999px',
                                        border: '1px dashed #334155',
                                        background: '#020617',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        color: '#94a3b8',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Plus size={18} color="#94a3b8" />
                                    Add Website
                                </button>
                            )}
                        </div>

                        {/* ADDRESS */}
                        <div style={{ marginBottom: '0' }}>
                            {contact.address ? (
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <input
                                        type="text"
                                        value={contact.address || ''}
                                        onChange={(e) => handleContactUpdate('address', e.target.value)}
                                        placeholder="1000 Marketplace Ave. NY, 10001, United States"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb'
                                        }}
                                    />
                                    <button
                                        onClick={() => deleteContactField('address')}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            border: '1px solid #334155',
                                            borderRadius: '999px',
                                            background: '#020617',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            color: '#ef4444'
                                        }}
                                    >
                                        <X size={20} color="#ef4444" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleContactUpdate('address', ' ')}
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem',
                                        borderRadius: '999px',
                                        border: '1px dashed #334155',
                                        background: '#020617',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        color: '#94a3b8',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Plus size={18} color="#94a3b8" />
                                    Add Address
                                </button>
                            )}
                        </div>

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
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>SOCIAL MEDIA CHANNELS</div>
                    </div>
                    <motion.div
                        animate={{ rotate: isSocialOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: '1px solid #334155',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#020617'
                        }}
                    >
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

                        {/* Flex for social media inputs */}
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>

                            {social.website && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Website*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.website ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://img.icons8.com/color/48/domain.png" alt="Website" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.website || ''}
                                            onChange={(e) => handleSocialUpdate('website', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('website')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.website && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.website}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.whatsapp && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Whatsapp*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.whatsapp ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/whatsapp.png" alt="WhatsApp" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.whatsapp || ''}
                                            onChange={(e) => handleSocialUpdate('whatsapp', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('whatsapp')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.whatsapp && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.whatsapp}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.facebook && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Facebook*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.facebook ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/facebook.png" alt="Facebook" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.facebook || ''}
                                            onChange={(e) => handleSocialUpdate('facebook', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('facebook')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.facebook && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.facebook}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.linkedin && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Linkedin*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.linkedin ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/linkedin.png" alt="LinkedIn" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.linkedin || ''}
                                            onChange={(e) => handleSocialUpdate('linkedin', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('linkedin')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.linkedin && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.linkedin}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.tiktok && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Tiktok*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.tiktok ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/tiktok.png" alt="TikTok" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.tiktok || ''}
                                            onChange={(e) => handleSocialUpdate('tiktok', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('tiktok')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.tiktok && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.tiktok}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.instagram && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Instagram*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.instagram ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/instagram.png" alt="Instagram" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.instagram || ''}
                                            onChange={(e) => handleSocialUpdate('instagram', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('instagram')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.instagram && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.instagram}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.twitter && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Twitter (X)*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.twitter ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/twitter.png" alt="Twitter" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.twitter || ''}
                                            onChange={(e) => handleSocialUpdate('twitter', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('twitter')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.twitter && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.twitter}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.discord && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Discord*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.discord ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/discord.png" alt="Discord" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.discord || ''}
                                            onChange={(e) => handleSocialUpdate('discord', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('discord')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.discord && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.discord}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.youtube && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        YouTube*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.youtube ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/youtube.png" alt="YouTube" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.youtube || ''}
                                            onChange={(e) => handleSocialUpdate('youtube', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('youtube')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.youtube && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.youtube}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.twitch && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Twitch*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.twitch ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/twitch.png" alt="Twitch" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.twitch || ''}
                                            onChange={(e) => handleSocialUpdate('twitch', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('twitch')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.twitch && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.twitch}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.line && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Line*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.line ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/line.png" alt="Line" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.line || ''}
                                            onChange={(e) => handleSocialUpdate('line', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('line')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.line && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.line}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.snapchat && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Snapchat*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.snapchat ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/snapchat.png" alt="Snapchat" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.snapchat || ''}
                                            onChange={(e) => handleSocialUpdate('snapchat', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('snapchat')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.snapchat && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.snapchat}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.tumblr && (
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Tumblr*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.tumblr ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/tumblr.png" alt="Tumblr" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.tumblr || ''}
                                            onChange={(e) => handleSocialUpdate('tumblr', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('tumblr')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.tumblr && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.tumblr}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.spotify && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Spotify*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.spotify ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/spotify.png" alt="Spotify" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.spotify || ''}
                                            onChange={(e) => handleSocialUpdate('spotify', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('spotify')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.spotify && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.spotify}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.dribbble && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Dribbble*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.dribbble ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/dribbble.png" alt="Dribbble" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.dribbble || ''}
                                            onChange={(e) => handleSocialUpdate('dribbble', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('dribbble')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.dribbble && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.dribbble}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.pinterest && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Pinterest*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.pinterest ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/pinterest.png" alt="Pinterest" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.pinterest || ''}
                                            onChange={(e) => handleSocialUpdate('pinterest', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('pinterest')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.pinterest && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.pinterest}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.telegram && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Telegram*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.telegram ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/telegram.png" alt="Telegram" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.telegram || ''}
                                            onChange={(e) => handleSocialUpdate('telegram', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('telegram')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.telegram && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.telegram}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.behance && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Behance*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.behance ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/behance.png" alt="Behance" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.behance || ''}
                                            onChange={(e) => handleSocialUpdate('behance', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('behance')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.behance && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.behance}
                                        </p>
                                    )}
                                </div>
                            )}

                            {social.reddit && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Reddit*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.reddit ? '#ef4444' : '#334155'}`, borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: '44px', background: '#020617' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#0b1222',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '0.5rem',
                                            flexShrink: 0,
                                            border: '1px solid #334155'
                                        }}>
                                            <img src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/reddit.png" alt="Reddit" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        </div>
                                        <input
                                            type="text"
                                            value={social.reddit || ''}
                                            onChange={(e) => handleSocialUpdate('reddit', e.target.value)}
                                            placeholder="https://"
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#e5e7eb',
                                                background: 'transparent'
                                            }}
                                        />
                                        <button
                                            onClick={() => deleteSocialField('reddit')}
                                            style={{
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                padding: '0.25rem',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '999px',
                                                width: '32px',
                                                height: '32px',
                                                marginLeft: '0.5rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    {errors.reddit && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.reddit}
                                        </p>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* ADD MORE Section */}
                        <div>
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', textTransform: 'uppercase' }}>ADD MORE</span>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                    Click on the icon to add a social media profile.
                                </div>
                            </div>

                            {/* Social Media Icons Grid */}
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {socialPlatforms.map((platform) => (
                                    <div
                                        key={platform.id}
                                        onClick={() => handleSocialUpdate(platform.id, ' ')}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: platform.color,
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                            position: 'relative'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <img
                                            src={platform.icon}
                                            alt={platform.name}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                objectFit: 'contain',
                                                filter: 'none'
                                            }}
                                        />
                                        {social[platform.id] && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-6px',
                                                right: '-6px',
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
                                                <Check size={10} color="#fff" strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        {errors.general && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                background: '#450a0a',
                                border: '1px solid #ef4444',
                                borderRadius: '8px',
                                color: '#fecaca',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}>
                                {errors.general}
                            </div>
                        )}

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* EXCHANGE CONTACT ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsExchangeOpen(!isExchangeOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>EXCHANGE CONTACT</div>
                    </div>
                    <motion.div
                        animate={{ rotate: isExchangeOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: '1px solid #334155',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#020617'
                        }}
                    >
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isExchangeOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>

                        {/* Full Name */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#e5e7eb'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={exchange.fullName === true}
                                    onChange={(e) => handleExchangeUpdate('fullName', e.target.checked)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '0.75rem',
                                        accentColor: '#06b6d4',
                                        cursor: 'pointer'
                                    }}
                                />
                                Full Name
                            </label>
                        </div>

                        {/* Contact Number */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#e5e7eb'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={exchange.contactNumber === true}
                                    onChange={(e) => handleExchangeUpdate('contactNumber', e.target.checked)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '0.75rem',
                                        accentColor: '#06b6d4',
                                        cursor: 'pointer'
                                    }}
                                />
                                Contact Number
                            </label>
                        </div>

                        {/* Organization */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#e5e7eb'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={exchange.organization === true}
                                    onChange={(e) => handleExchangeUpdate('organization', e.target.checked)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '0.75rem',
                                        accentColor: '#06b6d4',
                                        cursor: 'pointer'
                                    }}
                                />
                                Organization
                            </label>
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#e5e7eb'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={exchange.email === true}
                                    onChange={(e) => handleExchangeUpdate('email', e.target.checked)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '0.75rem',
                                        accentColor: '#06b6d4',
                                        cursor: 'pointer'
                                    }}
                                />
                                Email
                            </label>
                        </div>

                        {/* Job Title */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#e5e7eb'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={exchange.jobTitle === true}
                                    onChange={(e) => handleExchangeUpdate('jobTitle', e.target.checked)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '0.75rem',
                                        accentColor: '#06b6d4',
                                        cursor: 'pointer'
                                    }}
                                />
                                Job Title
                            </label>
                        </div>

                        {/* Website */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#e5e7eb'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={exchange.website === true}
                                    onChange={(e) => handleExchangeUpdate('website', e.target.checked)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '0.75rem',
                                        accentColor: '#06b6d4',
                                        cursor: 'pointer'
                                    }}
                                />
                                Website
                            </label>
                        </div>


                        {/* Custom Fields */}
                        {exchange.customFields && exchange.customFields.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                {exchange.customFields.map((field, index) => (
                                    <div key={field.id} style={{
                                        marginBottom: '1.5rem',
                                        padding: '1.5rem',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        background: '#020617'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '1rem'
                                        }}>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                color: '#ffa305',
                                                textTransform: 'uppercase'
                                            }}>
                                                ASK THEM A PERSONALIZED QUESTION
                                            </div>
                                            <button
                                                onClick={() => handleDeleteCustomField(field.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#94a3b8',
                                                    padding: '0.25rem'
                                                }}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>

                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                            Type your question and options
                                        </div>

                                        {/* Type Selector */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                Type
                                            </label>
                                            <select
                                                value={field.type}
                                                onChange={(e) => handleCustomFieldUpdate(field.id, 'type', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '10px',
                                                    border: '1px solid #334155',
                                                    fontSize: '0.9rem',
                                                    outline: 'none',
                                                    background: '#020617',
                                                    color: '#e5e7eb',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <option value="text">Text</option>
                                                <option value="options">Options</option>
                                                <option value="radio">Radio</option>
                                            </select>
                                        </div>

                                        {/* Label Input */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={field.label}
                                                onChange={(e) => handleCustomFieldUpdate(field.id, 'label', e.target.value)}
                                                placeholder="Enter question label"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '10px',
                                                    border: '1px solid #334155',
                                                    fontSize: '0.9rem',
                                                    outline: 'none',
                                                    background: '#020617',
                                                    color: '#e5e7eb'
                                                }}
                                            />
                                        </div>

                                        {/* Options/Radio Fields */}
                                            {(field.type === 'options' || field.type === 'radio') && (
                                                <div>
                                                    {field.options && field.options.map((option, optIndex) => (
                                                        <div key={optIndex} style={{ marginBottom: '0.75rem' }}>
                                                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                                {field.type === 'options' ? 'Option' : 'Radio'} {optIndex + 1}
                                                            </label>
                                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                            <input
                                                                type="text"
                                                                value={option}
                                                                onChange={(e) => handleOptionUpdate(field.id, optIndex, e.target.value)}
                                                                placeholder={`Enter ${field.type === 'options' ? 'option' : 'radio'} ${optIndex + 1}`}
                                                                style={{
                                                                    flex: 1,
                                                                    padding: '0.75rem 1rem',
                                                                    borderRadius: '10px',
                                                                    border: '1px solid #334155',
                                                                    fontSize: '0.9rem',
                                                                    outline: 'none',
                                                                    background: '#020617',
                                                                    color: '#e5e7eb'
                                                                }}
                                                            />
                                                            <button
                                                                onClick={() => handleDeleteOption(field.id, optIndex)}
                                                                style={{
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    color: '#94a3b8',
                                                                    padding: '0.5rem'
                                                                }}
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Add Other Button */}
                                                <button
                                                    onClick={() => handleAddOption(field.id)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        background: 'none',
                                                        color: '#ffa305',
                                                        border: 'none',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        padding: '0.5rem 0'
                                                    }}
                                                >
                                                    Add Other
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add Customized Button */}
                        <div style={{ marginBottom: errors.exchange ? '1rem' : '0' }}>
                            <button
                                onClick={handleAddCustomField}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: '#ffa305',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#ffa305'}
                                onMouseOut={(e) => e.target.style.background = '#ffa305'}
                            >
                                <Plus size={16} />
                                Add Customized
                            </button>
                        </div>

                        {/* Error Message */}
                        {errors.exchange && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                background: '#450a0a',
                                border: '1px solid #ef4444',
                                borderRadius: '8px',
                                color: '#fecaca',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}>
                                {errors.exchange}
                            </div>
                        )}

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
</div>
);
};

export default BusinessCardConfig;
