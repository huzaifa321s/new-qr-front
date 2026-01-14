import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Phone, Mail, Globe, Trash2, Plus, Facebook, Instagram, Twitter, Linkedin, Youtube, Twitch, Github, Music, Ghost, Gamepad2, Dribbble, MessageCircle, MessageSquare, Video } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const BioPageConfig = ({ config, onChange, errors = {}, setErrors }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const contact = config.contact || {};
    const social = (config.social && Object.keys(config.social).length > 0)
        ? Object.fromEntries(
            Object.entries(config.social).map(([k, v]) => [k, v === true ? '' : v])
        )
        : {
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            website: 'https://techoid.com'
        };

    const primaryColor = design.color?.header || '#ffa305';
    const secondaryColor = design.color?.light || '#334155';

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

    const handlePictureUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                picture: { url }
            }
        }));
    };

    const handlePictureFrameUpdate = (frame) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                pictureFrame: frame
            }
        }));
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
        onChange(prev => {
            const currentSocial = (prev.social && Object.keys(prev.social).length > 0)
                ? prev.social
                : {
                    facebook: 'https://facebook.com',
                    instagram: 'https://instagram.com',
                    website: 'https://techoid.com'
                };
            return {
                ...prev,
                social: {
                    ...currentSocial,
                    [key]: value
                }
            };
        });

        // Clear error when user updates a social field
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                delete newErrors.general; // Also clear general error when any social field is updated or added
                return newErrors;
            });
        }
    };

    const palettes = [
        { p: '#0B2D86', s: '#FFA800' },
        { p: '#FACC15', s: '#FEF9C3' },
        { p: '#FFA305', s: '#FFD89A' },
        { p: '#16A34A', s: '#86EFAC' },
        { p: '#06B6D4', s: '#67E8F9' }
    ];

    const pictureOptions = [
        { id: 'pic1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { id: 'pic2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' },
        { id: 'pic3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
        { id: 'pic4', url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
    ];

    return (
        <div>
            {/* DESIGN ACCORDION */}
            <ReusableDesignAccordion
                design={{
                    ...design,
                    color: {
                        ...design.color,
                        header: design.color?.header || '#ffa305',
                        light: design.color?.light || '#334155'
                    },

                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'color.header', secondary: 'color.light' }}
                palettes={palettes}
                logoKey="logo.url"
                logoOptions={pictureOptions}
                logoLabel="LOGO"
                logoHelpText="128x128px, 1:1 Ratio"
            >
                {/* PICTURE FRAME SECTION - Passed as Children */}
                <div style={{ marginBottom: '0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        PICTURE FRAME
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {/* Rectangular Option */}
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: (design.pictureFrame === 'rectangular') ? (design.color?.header || '#ffa305') : '#f8fafc'
                        }}>
                            <input
                                type="radio"
                                name="pictureFrame"
                                checked={design.pictureFrame === 'rectangular'}
                                onChange={() => handlePictureFrameUpdate('rectangular')}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    accentColor: '#ffa305',
                                    cursor: 'pointer'
                                }}
                            />
                            Rectangular
                        </label>

                        {/* Circular Option */}
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: (design.pictureFrame === 'circular' || !design.pictureFrame) ? (design.color?.header || '#ffa305') : '#f8fafc'
                        }}>
                            <input
                                type="radio"
                                name="pictureFrame"
                                checked={design.pictureFrame === 'circular' || !design.pictureFrame}
                                onChange={() => handlePictureFrameUpdate('circular')}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    accentColor: '#ffa305',
                                    cursor: 'pointer'
                                }}
                            />
                            Circular
                        </label>
                    </div>
                </div>
            </ReusableDesignAccordion>

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

                        {/* NAME FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                NAME*
                            </label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {/* Name Input */}
                                <div style={{ flex: '2 1 200px' }}>
                                    <input
                                        type="text"
                                        value={basicInfo.name || ''}
                                        onChange={(e) => handleBasicInfoUpdate('name', e.target.value)}
                                        placeholder="Hellen Grey"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: `1px solid ${errors.name ? '#ef4444' : '#334155'}`,
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            fontSize: '0.9rem',
                                            outline: 'none'
                                        }}
                                    />
                                    {errors.name && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Text Color */}
                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        padding: '0.5rem 0.6rem',
                                        height: '44px',
                                        background: '#020617'
                                    }}>
                                        <input
                                            type="text"
                                            value={basicInfo.nameColor || '#ffa305'}
                                            onChange={(e) => handleBasicInfoUpdate('nameColor', e.target.value)}
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
                                        <input
                                            type="color"
                                            value={basicInfo.nameColor || '#ffa305'}
                                            onChange={(e) => handleBasicInfoUpdate('nameColor', e.target.value)}
                                            style={{
                                                width: '24px',
                                                height: '28px',
                                                border: 'none',
                                                padding: 0,
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                flexShrink: 0
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Font */}
                                <div style={{ flex: '1 1 100px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={basicInfo.nameFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('nameFont', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            height: '44px'
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

                        {/* COMPANY NAME FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                COMPANY NAME
                            </label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {/* Company Name Input */}
                                <div style={{ flex: '2 1 200px' }}>
                                    <input
                                        type="text"
                                        value={basicInfo.companyName || ''}
                                        onChange={(e) => handleBasicInfoUpdate('companyName', e.target.value)}
                                        placeholder="Sterling & Co."
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: `1px solid ${errors.companyName ? '#ef4444' : '#334155'}`,
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            fontSize: '0.9rem',
                                            outline: 'none'
                                        }}
                                    />
                                    {errors.companyName && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.companyName}
                                        </p>
                                    )}
                                </div>

                                {/* Text Color */}
                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        padding: '0.5rem 0.6rem',
                                        height: '44px',
                                        background: '#020617'
                                    }}>
                                        <input
                                            type="text"
                                            value={basicInfo.companyNameColor || '#000000'}
                                            onChange={(e) => handleBasicInfoUpdate('companyNameColor', e.target.value)}
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
                                        <input
                                            type="color"
                                            value={basicInfo.companyNameColor || '#000000'}
                                            onChange={(e) => handleBasicInfoUpdate('companyNameColor', e.target.value)}
                                            style={{
                                                width: '24px',
                                                height: '28px',
                                                border: 'none',
                                                padding: 0,
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                flexShrink: 0
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Font */}
                                <div style={{ flex: '1 1 100px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={basicInfo.companyNameFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('companyNameFont', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            height: '44px'
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

                        {/* DESCRIPTION FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                DESCRIPTION
                            </label>
                            <textarea
                                value={basicInfo.description || ''}
                                onChange={(e) => handleBasicInfoUpdate('description', e.target.value)}
                                placeholder="We aim to provide fresh and healthy snacks people on the go."
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '10px',
                                    border: '1px solid #334155',
                                    background: '#020617',
                                    color: '#e5e7eb',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* CONTACT DETAILS ACCORDION */}
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
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>Contact Details</div>
                    <motion.div animate={{ rotate: isContactOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
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

                        {/* PHONE NUMBER */}
                        {contact.phone !== null && (
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
                                    {/* Phone Icon Box */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        background: '#020617'
                                    }}>
                                        <Phone size={20} color="#94a3b8" />
                                    </div>

                                    {/* Phone Number Input */}
                                    <div style={{ flex: '1 1 200px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            value={contact.phone || ''}
                                            onChange={(e) => handleContactUpdate('phone', e.target.value)}
                                            placeholder="703-701-9964"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                fontSize: '0.9rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Button Title */}
                                    <div style={{ flex: '1 1 150px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            Button Title
                                        </label>
                                        <input
                                            type="text"
                                            value={contact.phoneButtonTitle || ''}
                                            onChange={(e) => handleContactUpdate('phoneButtonTitle', e.target.value)}
                                            placeholder="Mobile"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                fontSize: '0.9rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Delete Button */}
                                    <div
                                        onClick={() => handleContactUpdate('phone', null)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '48px',
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '999px',
                                            border: '1px solid #334155',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: '#020617'
                                        }}>
                                            <X size={16} color="#94a3b8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* EMAIL */}
                        {contact.email !== null && (
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
                                    {/* Email Icon Box */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        background: '#020617'
                                    }}>
                                        <Mail size={20} color="#94a3b8" />
                                    </div>

                                    {/* Email Input */}
                                    <div style={{ flex: '1 1 200px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={contact.email || ''}
                                            onChange={(e) => handleContactUpdate('email', e.target.value)}
                                            placeholder="Hellen@gmail.com"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                fontSize: '0.9rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Button Title */}
                                    <div style={{ flex: '1 1 150px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            Button Title
                                        </label>
                                        <input
                                            type="text"
                                            value={contact.emailButtonTitle || ''}
                                            onChange={(e) => handleContactUpdate('emailButtonTitle', e.target.value)}
                                            placeholder="Email"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                fontSize: '0.9rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Delete Button */}
                                    <div
                                        onClick={() => handleContactUpdate('email', null)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '48px',
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '999px',
                                            border: '1px solid #334155',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: '#020617'
                                        }}>
                                            <X size={16} color="#94a3b8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* WEBSITE */}
                        {contact.website !== null && (
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
                                    {/* Website Icon Box */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        border: '1px solid #334155',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        background: '#020617'
                                    }}>
                                        <Globe size={20} color="#94a3b8" />
                                    </div>

                                    {/* Website Input */}
                                    <div style={{ flex: '1 1 200px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            value={contact.website || ''}
                                            onChange={(e) => handleContactUpdate('website', e.target.value)}
                                            placeholder="www.sterling.com"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                fontSize: '0.9rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Button Title */}
                                    <div style={{ flex: '1 1 150px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            Button Title
                                        </label>
                                        <input
                                            type="text"
                                            value={contact.websiteButtonTitle || ''}
                                            onChange={(e) => handleContactUpdate('websiteButtonTitle', e.target.value)}
                                            placeholder="Website"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                fontSize: '0.9rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Delete Button */}
                                    <div
                                        onClick={() => handleContactUpdate('website', null)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '48px',
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '999px',
                                            border: '1px solid #334155',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: '#020617'
                                        }}>
                                            <X size={16} color="#94a3b8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add More Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {contact.phone === null && (
                                <button
                                    onClick={() => handleContactUpdate('phone', '')}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '999px',
                                        border: 'none',
                                        background: '#ffa305',
                                        color: '#0f172a',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Phone Number
                                </button>
                            )}

                            {contact.email === null && (
                                <button
                                    onClick={() => handleContactUpdate('email', '')}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '999px',
                                        border: 'none',
                                        background: '#ffa305',
                                        color: '#0f172a',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Email
                                </button>
                            )}

                            {contact.website === null && (
                                <button
                                    onClick={() => handleContactUpdate('website', '')}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '999px',
                                        border: 'none',
                                        background: '#ffa305',
                                        color: '#0f172a',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Website
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
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>Social Media Channels</div>
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

                        {/* Dynamic Social Media Inputs Grid */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {[
                                { id: 'facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', label: 'Facebook', color: '#1877F2', placeholder: 'https://facebook.com/...' },
                                { id: 'instagram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', label: 'Instagram', color: '#E4405F', placeholder: 'https://instagram.com/...' },
                                { id: 'twitter', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png', label: 'X (Twitter)', color: '#1DA1F2', placeholder: 'https://x.com/...' },
                                { id: 'linkedin', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', label: 'LinkedIn', color: '#0A66C2', placeholder: 'https://linkedin.com/in/...' },
                                { id: 'youtube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', label: 'YouTube', color: '#FF0000', placeholder: 'https://youtube.com/...' },
                                { id: 'whatsapp', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', label: 'WhatsApp', color: '#25D366', placeholder: 'https://wa.me/...' },
                                { id: 'spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', label: 'Spotify', color: '#1DB954', placeholder: 'https://open.spotify.com/...' },
                                { id: 'website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', label: 'Website', color: '#4B5563', placeholder: 'https://mysite.com' },
                                { id: 'twitch', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111668.png', label: 'Twitch', color: '#9146FF', placeholder: 'https://twitch.tv/...' },
                                { id: 'github', icon: 'https://cdn-icons-png.flaticon.com/512/733/733553.png', label: 'GitHub', color: '#181717', placeholder: 'https://github.com/...' },
                                { id: 'snapchat', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png', label: 'Snapchat', color: '#FFFC00', textColor: '#000', placeholder: 'https://snapchat.com/...' },
                                { id: 'dribbble', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111388.png', label: 'Dribbble', color: '#EA4C89', placeholder: 'https://dribbble.com/...' },
                                { id: 'discord', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png', label: 'Discord', color: '#5865F2', placeholder: 'https://discord.gg/...' },
                                { id: 'pinterest', icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png', label: 'Pinterest', color: '#BD081C', placeholder: 'https://pinterest.com/...' },
                                { id: 'tiktok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', label: 'TikTok', color: '#000000', placeholder: 'https://tiktok.com/...' },
                                { id: 'reddit', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670154.png', label: 'Reddit', color: '#FF4500', placeholder: 'https://reddit.com/...' }
                            ].map((platform) => {
                                // Only render inputs for active platforms
                                if (social[platform.id] !== undefined && social[platform.id] !== null) {
                                    const Icon = platform.icon;
                                    return (
                                        <div key={platform.id} style={{ flex: '1 1 200px' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                {platform.label}*
                                            </label>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                                                <div style={{
                                                    width: '42px',
                                                    height: '42px',
                                                    borderRadius: '8px',
                                                    background: '#020617',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    overflow: 'hidden',
                                                    border: '1px solid #334155'
                                                }}>
                                                    <img src={platform.icon} alt={platform.label} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={social[platform.id]}
                                                    onChange={(e) => handleSocialUpdate(platform.id, e.target.value)}
                                                    placeholder={platform.placeholder}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '10px',
                                                        border: `1px solid ${errors[platform.id] ? '#ef4444' : '#334155'}`,
                                                        background: '#020617',
                                                        color: '#e5e7eb',
                                                        fontSize: '0.9rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                                <div
                                                    onClick={() => handleSocialUpdate(platform.id, null)}
                                                    style={{ cursor: 'pointer', padding: '0.5rem', color: '#94a3b8' }}
                                                >
                                                    <div style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        borderRadius: '999px',
                                                        border: '1px solid #334155',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        background: '#020617'
                                                    }}>
                                                        <X size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                            {errors[platform.id] && (
                                                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', width: '100%', paddingLeft: '3.5rem' }}>
                                                    {errors[platform.id]}
                                                </p>
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* ADD MORE Section */}
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                ADD MORE
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                Click on the icon to add a social media profile.
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {[
                                    { id: 'facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', color: '#1877F2' },
                                    { id: 'instagram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', color: '#E4405F' },
                                    { id: 'twitter', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png', color: '#1DA1F2' },
                                    { id: 'linkedin', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', color: '#0A66C2' },
                                    { id: 'discord', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png', color: '#5865F2' },
                                    { id: 'twitch', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111668.png', color: '#9146FF' },
                                    { id: 'youtube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: '#FF0000' },
                                    { id: 'whatsapp', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', color: '#25D366' },
                                    { id: 'snapchat', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png', color: '#FFFC00', textColor: '#000' },
                                    { id: 'tiktok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', color: '#000000' },
                                    { id: 'spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', color: '#1DB954' },
                                    { id: 'dribbble', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111388.png', color: '#EA4C89' },
                                    { id: 'pinterest', icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png', color: '#BD081C' },
                                    { id: 'reddit', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670154.png', color: '#FF4500' },
                                    { id: 'website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#4B5563' },
                                    { id: 'github', icon: 'https://cdn-icons-png.flaticon.com/512/733/733553.png', color: '#181717' }
                                ].map((platform) => {
                                    // Only render add buttons for inactive platforms
                                    if (social[platform.id] === undefined || social[platform.id] === null) {
                                        return (
                                            <motion.div
                                                key={platform.id}
                                                onClick={() => handleSocialUpdate(platform.id, '')}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '8px',
                                                    border: `1px solid #334155`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    background: '#020617',
                                                    transition: 'all 0.2s ease',
                                                    overflow: 'hidden'
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <img src={platform.icon} alt={platform.id} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                            </motion.div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>

                        {errors.general && (
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px' }}>
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', margin: 0, fontWeight: '600' }}>
                                    {errors.general}
                                </p>
                            </div>
                        )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div >
    );
};

export default BioPageConfig;
