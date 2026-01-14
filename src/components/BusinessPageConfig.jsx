import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Clock, Wifi, Baby, Accessibility, Utensils, Plane, PawPrint, Car, Bed, Coffee, Wine, Phone, Mail, Globe, Plus, MapPin, Instagram, Facebook, Twitter, Linkedin, MessageCircle, Youtube, Twitch, Music, Ghost, Gamepad2, Dribbble, MessageSquare, Github, Eye } from 'lucide-react';
import ColorPicker from './ColorPicker';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableDesignAccordion from './ReusableDesignAccordion';
import ImageUploadModal from './ImageUploadModal';

const BusinessPageConfig = ({ config, onChange, errors = {}, setErrors }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isOpeningHoursOpen, setIsOpeningHoursOpen] = useState(false);
    const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    // New state for modal and hover
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadModalTempImage, setUploadModalTempImage] = useState(null);
    const [uploadModalFileName, setUploadModalFileName] = useState('');
    const fileInputRef = useRef(null);

    const design = config.design || {};
    const businessInfo = config.businessInfo || {};
    const openingHours = config.openingHours || {
        monday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        tuesday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        wednesday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        thursday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        friday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        saturday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        sunday: { enabled: false, open: '08:00 AM', close: '08:00 AM' }
    };
    const facilities = Array.isArray(config.facilities) && config.facilities.length > 0
        ? config.facilities
        : ['wifi', 'parking', 'restaurant'];
    const contact = config.contact || {};
    const social = config.social || {};

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

    const handlePictureUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                picture: { url }
            }
        }));
    };

    const handleBusinessInfoUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            businessInfo: {
                ...prev.businessInfo,
                [key]: value
            }
        }));
    };

    const handleOpeningHoursUpdate = (day, field, value) => {
        onChange(prev => ({
            ...prev,
            openingHours: {
                ...prev.openingHours,
                [day]: {
                    ...prev.openingHours?.[day],
                    [field]: value
                }
            }
        }));
    };

    const handleFacilityToggle = (facility) => {
        onChange(prev => {
            const currentFacilities = Array.isArray(prev.facilities) && prev.facilities.length > 0
                ? prev.facilities
                : ['wifi', 'parking', 'restaurant'];
            const isSelected = currentFacilities.includes(facility);
            return {
                ...prev,
                facilities: isSelected
                    ? currentFacilities.filter(f => f !== facility)
                    : [...currentFacilities, facility]
            };
        });
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

    const handleSocialToggle = (platformId) => {
        onChange(prev => {
            const currentSocial = prev.social || {};

            if (currentSocial[platformId] !== undefined) {
                // Remove if exists
                const newSocial = { ...currentSocial };
                delete newSocial[platformId];
                return { ...prev, social: newSocial };
            } else {
                // Add if not exists
                // Clear error when user adds a channel
                if (setErrors) {
                    setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors[platformId]; // Clear field-specific error
                        delete newErrors.general; // Clear general error
                        return newErrors;
                    });
                }
                return {
                    ...prev,
                    social: {
                        ...currentSocial,
                        [platformId]: ''
                    }
                };
            }
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
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

        const reader = new FileReader();
        reader.onload = () => {
            setUploadModalTempImage(reader.result);
            setUploadModalFileName(file.name);
            setIsUploadModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = ''; // Reset input
    };

    const handleUploadModalSave = (url) => {
        handleDesignUpdate('heroImage', url);
    };

    const handleFieldFocus = (e) => {
        e.target.style.borderColor = primaryColor;
        e.target.style.boxShadow = '0 0 0 1px rgba(148, 163, 184, 0.6)';
    };

    const handleFieldBlur = (e) => {
        e.target.style.borderColor = '#334155';
        e.target.style.boxShadow = 'none';
    };

    const handleFieldMouseEnter = (e) => {
        e.target.style.borderColor = '#475569';
    };

    const handleFieldMouseLeave = (e) => {
        e.target.style.borderColor = '#334155';
    };

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const palettes = [
        { p: '#0B2D86', s: '#FFA800' },
        { p: '#FACC15', s: '#FEF9C3' },
        { p: '#8B5CF6', s: '#C4B5FD' },
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
                        header: design.color?.header || '#0B2D86',
                        light: design.color?.light || '#FFA800'
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
                logoOptions={pictureOptions}
                logoLabel="LOGO"
                logoHelpText="128x128px, 1:1 Ratio"
            >
                {/* HEADER IMAGE SECTION */}
                <div style={{ marginTop: '2rem', borderTop: '1px dashed #e2e8f0', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                            HEADER IMAGE
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            Minimum width: 400px, 3:2 Ratio
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Remove/Clear Option */}
                        <div
                            onClick={() => handleDesignUpdate('heroImage', null)}
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                background: '#fff'
                            }}
                        >
                            <X size={24} color="#cbd5e1" />
                        </div>

                        {/* Header Options */}
                        {[
                            'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                            'https://img.freepik.com/free-vector/social-media-marketing-concept-marketing-with-applications_23-2148421838.jpg',
                            'https://img.freepik.com/free-vector/black-white-doodle-seamless-pattern_1159-4567.jpg',
                            'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg',
                            'https://img.freepik.com/free-vector/seamless-pattern-with-red-geometric-shapes_1017-31359.jpg'
                        ].map((url, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleDesignUpdate('heroImage', url)}
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: design.heroImage === url ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {design.heroImage === url && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-6px',
                                        right: '-6px',
                                        width: '20px',
                                        height: '20px',
                                        background: '#8b5cf6',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid #fff'
                                    }}>
                                        <Check size={10} color="#fff" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Custom Uploaded Image (if not in presets) */}
                        {design.heroImage && ![
                            'https://img.freepik.com/free-vector/hand-drawn-social-media-doodles_23-2149862823.jpg',
                            'https://img.freepik.com/free-vector/social-media-marketing-concept-marketing-with-applications_23-2148421838.jpg',
                            'https://img.freepik.com/free-vector/black-white-doodle-seamless-pattern_1159-4567.jpg',
                            'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg',
                            'https://img.freepik.com/free-vector/seamless-pattern-with-red-geometric-shapes_1017-31359.jpg'
                        ].includes(design.heroImage) && (
                                <div
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '2px solid #8b5cf6',
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <img src={design.heroImage} alt="Custom Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '-6px',
                                        right: '-6px',
                                        width: '20px',
                                        height: '20px',
                                        background: '#8b5cf6',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid #fff',
                                        zIndex: 2
                                    }}>
                                        <Check size={10} color="#fff" />
                                    </div>
                                    {isHovered && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'rgba(0,0,0,0.5)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 3
                                        }}>
                                            <Eye size={20} color="#fff" />
                                        </div>
                                    )}
                                </div>
                            )}

                        {/* Upload Option */}
                        <div
                            onClick={triggerFileUpload}
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '8px',
                                border: '1px dashed #cbd5e1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <UploadCloud size={20} color="#94a3b8" />
                        </div>
                    </div>
                </div>
            </ReusableDesignAccordion>

            {/* Modal for Background Image Preview */}
            {isModalOpen && design.heroImage && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setIsModalOpen(false)}>
                    <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }} onClick={e => e.stopPropagation()}>
                        <img src={design.heroImage} alt="Header Preview" style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px' }} />
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '-40px',
                                background: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <X size={24} color="#000" />
                        </button>
                    </div>
                </div>
            )}

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
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
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
                                {/* COMPANY NAME */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            <div style={{ flex: '2 1 200px' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                    COMPANY NAME*
                                                </label>
                                                <input
                                                    type="text"
                                                    value={businessInfo.companyName || "Royal's Cafe"}
                                                    onChange={(e) => handleBusinessInfoUpdate('companyName', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        background: '#020617',
                                                        color: '#e5e7eb',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                            </div>

                                            <div style={{ flex: '1 1 120px' }}>
                                                <ColorPicker
                                                    label="Text Color"
                                                    color={businessInfo.companyNameColor || '#FFFFFF'}
                                                    onChange={(color) => handleBusinessInfoUpdate('companyNameColor', color)}
                                                />
                                            </div>

                                            <div style={{ flex: '1 1 100px' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                    Font
                                                </label>
                                                <select
                                                    value={businessInfo.companyNameFont || 'Work Sans'}
                                                    onChange={(e) => handleBusinessInfoUpdate('companyNameFont', e.target.value)}
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
                                                        color: '#e5e7eb',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                >
                                                    <option value="Work Sans">Work Sans</option>
                                                    <option value="Lato">Lato</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* HEADLINE */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            <div style={{ flex: '2 1 200px' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                    HEADLINE
                                                </label>
                                                <input
                                                    type="text"
                                                    value={businessInfo.headline || 'Eat. Refresh. Go.'}
                                                    onChange={(e) => handleBusinessInfoUpdate('headline', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        background: '#020617',
                                                        color: '#e5e7eb',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                            </div>

                                            <div style={{ flex: '1 1 120px' }}>
                                                <ColorPicker
                                                    label="Text Color"
                                                    color={businessInfo.headlineColor || '#FFFFFF'}
                                                    onChange={(color) => handleBusinessInfoUpdate('headlineColor', color)}
                                                />
                                            </div>

                                            <div style={{ flex: '1 1 100px' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                    Font
                                                </label>
                                                <select
                                                    value={businessInfo.headlineFont || 'Work Sans'}
                                                    onChange={(e) => handleBusinessInfoUpdate('headlineFont', e.target.value)}
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
                                                        color: '#e5e7eb',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                >
                                                    <option value="Work Sans">Work Sans</option>
                                                    <option value="Lato">Lato</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* DESCRIPTION */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        DESCRIPTION
                                    </label>
                                    <textarea
                                        value={businessInfo.description || 'We aim to provide fresh and healthy snacks people on the go.'}
                                        onChange={(e) => handleBusinessInfoUpdate('description', e.target.value)}
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
                                            color: '#e5e7eb',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                        }}
                                        onFocus={handleFieldFocus}
                                        onBlur={handleFieldBlur}
                                        onMouseEnter={handleFieldMouseEnter}
                                        onMouseLeave={handleFieldMouseLeave}
                                    />
                                </div>

                                {/* BUTTON */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        BUTTON
                                    </label>
                                    <input
                                        type="text"
                                        value={businessInfo.button || 'Visit Us'}
                                        onChange={(e) => handleBusinessInfoUpdate('button', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                        }}
                                        onFocus={handleFieldFocus}
                                        onBlur={handleFieldBlur}
                                        onMouseEnter={handleFieldMouseEnter}
                                        onMouseLeave={handleFieldMouseLeave}
                                    />
                                </div>

                                {/* WEBSITE */}
                                <div style={{ marginBottom: '0' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        WEBSITE
                                    </label>
                                    <input
                                        type="text"
                                        value={businessInfo.website || 'https://www.abcboutique.henerrival.com'}
                                        onChange={(e) => handleBusinessInfoUpdate('website', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                        }}
                                        onFocus={handleFieldFocus}
                                        onBlur={handleFieldBlur}
                                        onMouseEnter={handleFieldMouseEnter}
                                        onMouseLeave={handleFieldMouseLeave}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* OPENING HOURS ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsOpeningHoursOpen(!isOpeningHoursOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>OPENING HOURS</div>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpeningHoursOpen ? 180 : 0 }}
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
                    {isOpeningHoursOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>
                                {/* Time Format Toggle */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                    <button style={{
                                        padding: '0.55rem 1.25rem',
                                        borderRadius: '999px',
                                        border: '1px solid #334155',
                                        background: '#020617',
                                        color: '#94a3b8',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}>
                                        24 hrs
                                    </button>
                                    <button style={{
                                        padding: '0.55rem 1.25rem',
                                        borderRadius: '999px',
                                        border: '1px solid rgba(255,163,5,0.8)',
                                        background: 'rgba(255,163,5,0.1)',
                                        color: '#ffa305',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}>
                                        AM/PM
                                    </button>
                                </div>

                                {/* Days Schedule */}
                                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                                    <div key={day} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem',
                                        marginBottom: '1rem',
                                        paddingBottom: '1rem',
                                        borderBottom: day !== 'sunday' ? '1px solid #1e293b' : 'none'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={openingHours[day]?.enabled !== false}
                                                onChange={(e) => handleOpeningHoursUpdate(day, 'enabled', e.target.checked)}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    accentColor: '#06b6d4',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <div style={{
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                color: '#e5e7eb',
                                                textTransform: 'capitalize',
                                                minWidth: '100px'
                                            }}>
                                                {day}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            {/* Opening Time */}
                                            <div style={{ position: 'relative', flex: '1 1 120px' }}>
                                                <label style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.25rem' }}>OPEN</label>
                                                <input
                                                    type="text"
                                                    value={openingHours[day]?.open || '08:00 AM'}
                                                    onChange={(e) => handleOpeningHoursUpdate(day, 'open', e.target.value)}
                                                    placeholder="08:00 AM"
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 1rem',
                                                        paddingRight: '2.5rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        color: '#e5e7eb',
                                                        background: '#020617',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                                <Clock size={16} color="#64748b" style={{
                                                    position: 'absolute',
                                                    right: '0.75rem',
                                                    top: 'calc(50% + 8px)',
                                                    transform: 'translateY(-50%)',
                                                    pointerEvents: 'none'
                                                }} />
                                            </div>

                                            {/* Closing Time */}
                                            <div style={{ position: 'relative', flex: '1 1 120px' }}>
                                                <label style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.25rem' }}>CLOSE</label>
                                                <input
                                                    type="text"
                                                    value={openingHours[day]?.close || '08:00 AM'}
                                                    onChange={(e) => handleOpeningHoursUpdate(day, 'close', e.target.value)}
                                                    placeholder="08:00 AM"
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 1rem',
                                                        paddingRight: '2.5rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        color: '#e5e7eb',
                                                        background: '#020617',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                                <Clock size={16} color="#64748b" style={{
                                                    position: 'absolute',
                                                    right: '0.75rem',
                                                    top: 'calc(50% + 8px)',
                                                    transform: 'translateY(-50%)',
                                                    pointerEvents: 'none'
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* FACILITIES ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsFacilitiesOpen(!isFacilitiesOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>FACILITIES</div>
                    </div>
                    <motion.div
                        animate={{ rotate: isFacilitiesOpen ? 180 : 0 }}
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
                {isFacilitiesOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ borderTop: '1px solid #334155', background: '#020617' }}
                    >
                        <div style={{ padding: '1.25rem' }}>
                            {/* Facilities Icons */}
                            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                                {/* WiFi */}
                                <div
                                    onClick={() => handleFacilityToggle('wifi')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('wifi') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Wifi size={28} />
                                </div>

                                {/* Baby Care */}
                                <div
                                    onClick={() => handleFacilityToggle('baby')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('baby') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Baby size={28} />
                                </div>

                                {/* Wheelchair Access */}
                                <div
                                    onClick={() => handleFacilityToggle('wheelchair')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('wheelchair') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Accessibility size={28} />
                                </div>

                                {/* Restaurant */}
                                <div
                                    onClick={() => handleFacilityToggle('restaurant')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('restaurant') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Utensils size={28} />
                                </div>

                                {/* Smoking Area */}
                                <div
                                    onClick={() => handleFacilityToggle('smoking')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('smoking') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Plane size={28} />
                                </div>

                                {/* Pet Friendly */}
                                <div
                                    onClick={() => handleFacilityToggle('pets')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('pets') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <PawPrint size={28} />
                                </div>

                                {/* Parking */}
                                <div
                                    onClick={() => handleFacilityToggle('parking')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('parking') ? '#60a5fa' : '#64748b',
                                        fontSize: '28px',
                                        fontWeight: 'bold',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    P
                                </div>

                                {/* Hotel/Accommodation */}
                                <div
                                    onClick={() => handleFacilityToggle('hotel')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('hotel') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Bed size={28} />
                                </div>

                                {/* Car */}
                                <div
                                    onClick={() => handleFacilityToggle('car')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('car') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Car size={28} />
                                </div>

                                {/* Coffee */}
                                <div
                                    onClick={() => handleFacilityToggle('coffee')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('coffee') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Coffee size={28} />
                                </div>

                                {/* Bar/Drinks */}
                                <div
                                    onClick={() => handleFacilityToggle('bar')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('bar') ? '#60a5fa' : '#64748b',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Wine size={28} />
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
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
                                {/* NAME OF PERSON */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        NAME OF PERSON
                                    </label>
                                    <input
                                        type="text"
                                        value={contact.name || ''}
                                        onChange={(e) => handleContactUpdate('name', e.target.value)}
                                        placeholder="Hellegen"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                        }}
                                        onFocus={handleFieldFocus}
                                        onBlur={handleFieldBlur}
                                        onMouseEnter={handleFieldMouseEnter}
                                        onMouseLeave={handleFieldMouseLeave}
                                    />
                                </div>

                                {/* DESIGNATION IN THE COMPANY */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        DESIGNATION IN THE COMPANY
                                    </label>
                                    <input
                                        type="text"
                                        value={contact.designation || ''}
                                        onChange={(e) => handleContactUpdate('designation', e.target.value)}
                                        placeholder="Manager"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '10px',
                                            border: '1px solid #334155',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e5e7eb',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                        }}
                                        onFocus={handleFieldFocus}
                                        onBlur={handleFieldBlur}
                                        onMouseEnter={handleFieldMouseEnter}
                                        onMouseLeave={handleFieldMouseLeave}
                                    />
                                </div>

                                {/* LOCATION */}
                                <div style={{ marginBottom: '2rem' }}>
                                    {(contact.location && contact.location.length > 0) || contact.location === ' ' ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                    LOCATION
                                                </label>
                                                <div
                                                    onClick={() => handleContactUpdate('location', '')}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                >
                                                    <X size={14} color="#ef4444" />
                                                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '600' }}>Delete</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                                                    <MapPin size={20} color="#64748b" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={contact.location === ' ' ? '' : contact.location}
                                                    onChange={(e) => handleContactUpdate('location', e.target.value)}
                                                    placeholder="1000 Marketplace Ave. NY, 10001, United States"
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.75rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        color: '#e5e7eb',
                                                        background: '#020617',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                            <button
                                                onClick={() => handleContactUpdate('location', ' ')}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '10px',
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
                                            <Plus size={18} />
                                            Add Location
                                        </button>
                                    )}
                                </div>

                                {/* PHONE */}
                                <div style={{ marginBottom: '2rem' }}>
                                    {(contact.phone && contact.phone.length > 0) || contact.phone === ' ' ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                    PHONE
                                                </label>
                                                <div
                                                    onClick={() => handleContactUpdate('phone', '')}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                >
                                                    <X size={14} color="#ef4444" />
                                                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '600' }}>Delete</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                                                    <Phone size={20} color="#64748b" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={contact.phone === ' ' ? '' : contact.phone}
                                                    onChange={(e) => handleContactUpdate('phone', e.target.value)}
                                                    placeholder="15555551234"
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.75rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        color: '#e5e7eb',
                                                        background: '#020617',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleContactUpdate('phone', ' ')}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
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
                                            <Plus size={18} />
                                            Add Phone
                                        </button>
                                    )}
                                </div>

                                {/* EMAIL */}
                                <div style={{ marginBottom: '2rem' }}>
                                    {(contact.email && contact.email.length > 0) || contact.email === ' ' ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                    EMAIL
                                                </label>
                                                <div
                                                    onClick={() => handleContactUpdate('email', '')}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                >
                                                    <X size={14} color="#ef4444" />
                                                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '600' }}>Delete</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                                                    <Mail size={20} color="#64748b" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={contact.email === ' ' ? '' : contact.email}
                                                    onChange={(e) => handleContactUpdate('email', e.target.value)}
                                                    placeholder="Hellen@gmail.com"
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.75rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        color: '#e5e7eb',
                                                        background: '#020617',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleContactUpdate('email', ' ')}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
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
                                            <Plus size={18} />
                                            Add Email
                                        </button>
                                    )}
                                </div>

                                {/* WEBSITE */}
                                <div style={{ marginBottom: '0' }}>
                                    {(contact.website && contact.website.length > 0) || contact.website === ' ' ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                    WEBSITE
                                                </label>
                                                <div
                                                    onClick={() => handleContactUpdate('website', '')}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                >
                                                    <X size={14} color="#ef4444" />
                                                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '600' }}>Delete</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                                                    <Globe size={20} color="#64748b" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={contact.website === ' ' ? '' : contact.website}
                                                    onChange={(e) => handleContactUpdate('website', e.target.value)}
                                                    placeholder="https://Hellengrey.com"
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.75rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        color: '#e5e7eb',
                                                        background: '#020617',
                                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                    onBlur={handleFieldBlur}
                                                    onMouseEnter={handleFieldMouseEnter}
                                                    onMouseLeave={handleFieldMouseLeave}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleContactUpdate('website', ' ')}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
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
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
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
                                {(() => {
                                    const SOCIAL_PLATFORMS = [
                                        { id: 'facebook', name: 'Facebook', icon: 'https://img.icons8.com/color/48/facebook-new.png', color: '#1877F2' },
                                        { id: 'instagram', name: 'Instagram', icon: 'https://img.icons8.com/color/48/instagram-new--v1.png', color: '#E4405F' },
                                        { id: 'twitter', name: 'X', icon: 'https://img.icons8.com/color/48/twitterx--v1.png', color: '#000000' },
                                        { id: 'linkedin', name: 'LinkedIn', icon: 'https://img.icons8.com/color/48/linkedin.png', color: '#0A66C2' },
                                        { id: 'discord', name: 'Discord', icon: 'https://img.icons8.com/color/48/discord-new.png', color: '#5865F2' },
                                        { id: 'twitch', name: 'Twitch', icon: 'https://img.icons8.com/color/48/twitch.png', color: '#9146FF' },
                                        { id: 'youtube', name: 'YouTube', icon: 'https://img.icons8.com/color/48/youtube-play.png', color: '#FF0000' },
                                        { id: 'whatsapp', name: 'WhatsApp', icon: 'https://img.icons8.com/color/48/whatsapp--v1.png', color: '#25D366' },
                                        { id: 'snapchat', name: 'Snapchat', icon: 'https://img.icons8.com/color/48/snapchat--v1.png', color: '#FFFC00' },
                                        { id: 'tiktok', name: 'TikTok', icon: 'https://img.icons8.com/color/48/tiktok--v1.png', color: '#000000' },
                                        { id: 'pinterest', name: 'Pinterest', icon: 'https://img.icons8.com/color/48/pinterest.png', color: '#BD081C' },
                                        { id: 'dribbble', name: 'Dribbble', icon: 'https://img.icons8.com/color/48/dribbble.png', color: '#EA4C89' },
                                        { id: 'telegram', name: 'Telegram', icon: 'https://img.icons8.com/color/48/telegram-app.png', color: '#0088CC' },
                                        { id: 'reddit', name: 'Reddit', icon: 'https://img.icons8.com/color/48/reddit.png', color: '#FF4500' },
                                        { id: 'spotify', name: 'Spotify', icon: 'https://img.icons8.com/color/48/spotify--v1.png', color: '#1DB954' },
                                    ];

                                    const activePlatforms = SOCIAL_PLATFORMS.filter(p => social[p.id] !== undefined);
                                    const availablePlatforms = SOCIAL_PLATFORMS.filter(p => social[p.id] === undefined);

                                    return (
                                        <>
                                            {/* Active Inputs Grid */}
                                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                                {activePlatforms.map((platform) => (
                                                    <div key={platform.id} style={{ flex: '1 1 250px' }}>
                                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                            {platform.name}*
                                                        </label>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <div style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                background: '#0f172a',
                                                                borderRadius: '8px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0,
                                                                overflow: 'hidden',
                                                                border: '1px solid #334155'
                                                            }}>
                                                                <img src={platform.icon} alt={platform.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={social[platform.id] || ''}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    onChange(prev => ({
                                                                        ...prev,
                                                                        social: {
                                                                            ...(prev.social || social),
                                                                            [platform.id]: val
                                                                        }
                                                                    }));
                                                                    if (setErrors) {
                                                                        setErrors(prev => {
                                                                            const newErrors = { ...prev };
                                                                            delete newErrors[platform.id];
                                                                            delete newErrors.general;
                                                                            return newErrors;
                                                                        });
                                                                    }
                                                                }}
                                                                placeholder="https://"
                                                                style={{
                                                                    flex: 1,
                                                                    padding: '0.75rem',
                                                                    borderRadius: '10px',
                                                                    border: `1px solid ${errors[platform.id] ? '#ef4444' : '#334155'}`,
                                                                    fontSize: '0.9rem',
                                                                    outline: 'none',
                                                                    color: '#e5e7eb',
                                                                    background: '#020617'
                                                                }}
                                                            />
                                                            <button
                                                                onClick={() => handleSocialToggle(platform.id)}
                                                                style={{
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    color: '#cbd5e1',
                                                                    padding: '0.25rem'
                                                                }}
                                                            >
                                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                                                                    <X size={14} />
                                                                </div>
                                                            </button>
                                                        </div>
                                                        {errors[platform.id] && (
                                                            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                                {errors[platform.id]}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* ADD MORE Section */}
                                            <div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                    ADD MORE
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                                    Select a social media profile to add.
                                                </div>

                                                {/* Social Media Icons Grid */}
                                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                    {SOCIAL_PLATFORMS.map((platform) => {
                                                        const isAdded = social[platform.id] !== undefined;
                                                        return (
                                                            <div
                                                                key={platform.id}
                                                                onClick={() => handleSocialToggle(platform.id)}
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '8px',
                                                                    border: isAdded ? '1px solid #22c55e' : '1px solid #334155',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s',
                                                                    background: isAdded ? 'rgba(34, 197, 94, 0.16)' : '#020617',
                                                                    overflow: 'hidden',
                                                                    position: 'relative'
                                                                }}
                                                            >
                                                                <img src={platform.icon} alt={platform.name} style={{ width: '20px', height: '20px', objectFit: 'contain', opacity: isAdded ? 0.7 : 1 }} />
                                                                {isAdded && (
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
                                        </>
                                    );
                                })()}

                                {/* Error Message */}
                                {errors.general && (
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '0.75rem',
                                        background: 'rgba(248,113,113,0.12)',
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
            {/* Reusable Upload Modal */}
            <ImageUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => {
                    setIsUploadModalOpen(false);
                    setUploadModalTempImage(null);
                }}
                tempImage={uploadModalTempImage}
                onSave={handleUploadModalSave}
                fileName={uploadModalFileName}
                type="image"
            />
        </div>
    );
};

export default BusinessPageConfig;
