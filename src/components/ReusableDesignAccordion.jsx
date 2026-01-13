
import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCw, Check, UploadCloud, X, Eye } from 'lucide-react';
import ImageUploadModal from './ImageUploadModal';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable Design Accordion Component
 * 
 * @param {Object} props
 * @param {Object} props.design - The design configuration object
 * @param {Function} props.onChange - Handler for updates: (key, value) => void
 * @param {boolean} props.isOpen - Whether the accordion is open
 * @param {Function} props.onToggle - Handler to toggle open state
 * @param {string} props.label - Accordion title (default: "DESIGN")
 * @param {boolean} props.showColors - Whether to show the Colors section (default: true)
 * @param {boolean} props.showLogo - Whether to show the Logo section (default: true)
 * @param {string} props.logoLabel - Label for the Logo section (default: "LOGO")
 * @param {string} props.logoHelpText - Help text for logo (default: "128x128px, 1:1 Ratio")
 * @param {Object} props.colorKeys - Keys to access color values in `design`. Supports dot notation for one level nesting (e.g. 'color.header').
 * @param {Array} props.palettes - Array of color palettes { p: string, s: string }
 * @param {Array} props.logoOptions - Array of logo option objects { id: string, url: string }
 * @param {Object} props.logoKey - Key for the logo in `design` object (default: 'logo')
 * @param {React.ReactNode} props.children - Additional content to render inside the accordion
 */
const ReusableDesignAccordion = ({
    design = {},
    onChange,
    isOpen,
    onToggle,
    label = "DESIGN",
    showColors = true,
    showLogo = true,
    logoLabel = "LOGO",
    logoHelpText = "128x128px, 1:1 Ratio",
    colorKeys = { primary: 'color.header', secondary: 'color.light' },
    palettes = [],
    logoOptions = [],
    logoKey = 'logo', // Can be 'logo' (string url) or 'logo.url' (nested)
    logoShapeKey,
    onPaletteChange,
    children
}) => {

    // Helper to resolve value from path (e.g., "color.header" -> design.color.header)
    const getValue = (path) => {
        if (!path) return '';
        const keys = path.split('.');
        let val = design;
        for (const k of keys) {
            val = val?.[k];
        }
        return val;
    };

    const primaryColor = getValue(colorKeys.primary) || '#0B2D86';
    const secondaryColor = getValue(colorKeys.secondary) || '#FFA800';

    // Helper to determine if the logo is a string URL or an object with URL
    const getLogoUrl = () => {
        const val = getValue(logoKey);
        if (typeof val === 'string') return val;
        return val?.url || '';
    };

    const currentLogoUrl = getLogoUrl();
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // State for image upload modal
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleColorPaletteClick = (p, s) => {
        if (onPaletteChange) {
            onPaletteChange(p, s);
        } else {
            onChange(colorKeys.primary, p);
            onChange(colorKeys.secondary, s);
        }
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

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            setTempImage(reader.result);
            setIsUploadModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = null; // Clear input
    };

    const handleSaveLogo = (url) => {
        if (logoKey.includes('.')) {
            const keys = logoKey.split('.');
            onChange(keys[0], { ...getValue(keys[0]), [keys[1]]: url });
        } else {
            // If logoKey is just 'logo', store as object with url property
            onChange(logoKey, { url: url });
        }
    };

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
        >
            <button
                type="button"
                onClick={onToggle}
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
                <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>{label}</div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                    <ChevronDown size={18} color="#94a3b8" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ borderTop: '1px solid #334155', background: '#020617', overflow: 'hidden' }}
                    >
                        <div style={{ padding: '1.25rem' }}>

                    {showColors && (
                        <div style={{ marginBottom: showLogo || children ? '2rem' : '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                COLORS
                            </label>

                            {/* Color Palettes */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                {palettes.map((palette, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleColorPaletteClick(palette.p, palette.s)}
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: (primaryColor?.toLowerCase() === palette.p.toLowerCase() && secondaryColor?.toLowerCase() === palette.s.toLowerCase()) ? '3px solid #ffa305' : '2px solid #334155',
                                            position: 'relative',
                                            background: `linear-gradient(180deg, ${palette.p} 50%, ${palette.s} 50%)`,
                                            boxShadow: (primaryColor?.toLowerCase() === palette.p.toLowerCase() && secondaryColor?.toLowerCase() === palette.s.toLowerCase()) ? '0 6px 16px rgba(255,163,5,0.25)' : 'none'
                                        }}
                                    >
                                        {(primaryColor?.toLowerCase() === palette.p.toLowerCase() && secondaryColor?.toLowerCase() === palette.s.toLowerCase()) && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-6px',
                                                left: '-6px',
                                                width: '22px',
                                                height: '22px',
                                                background: '#ffa305',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #334155',
                                                color: '#fff',
                                                fontSize: '12px',
                                                fontWeight: 700
                                            }}>
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{
                                position: 'relative',
                                height: '1px',
                                background: 'none',
                                borderTop: '1px dashed #334155',
                                margin: '2rem 0'
                            }}></div>

                            {/* Primary and Secondary Color Inputs */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                {/* Primary Color */}
                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        Primary Color
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
                                            value={primaryColor}
                                            onChange={(e) => onChange(colorKeys.primary, e.target.value)}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.9rem',
                                                color: '#e5e7eb',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                background: 'transparent'
                                            }}
                                        />
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            background: primaryColor,
                                            borderRadius: '6px',
                                            flexShrink: 0,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: '1px solid #334155'
                                        }}>
                                            <input
                                                type="color"
                                                value={primaryColor}
                                                onChange={(e) => onChange(colorKeys.primary, e.target.value)}
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

                                {/* Swap Icon */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: '1.2rem',
                                    flexShrink: 0
                                }}>
                                    <div
                                        onClick={() => handleColorPaletteClick(secondaryColor, primaryColor)}
                                        style={{
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#cbd5e1'
                                        }}
                                    >
                                        <RefreshCw size={20} />
                                    </div>
                                </div>

                                {/* Secondary Color */}
                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        Secondary Color
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
                                            value={secondaryColor}
                                            onChange={(e) => onChange(colorKeys.secondary, e.target.value)}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.9rem',
                                                color: '#e5e7eb',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                background: 'transparent'
                                            }}
                                        />
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            background: secondaryColor,
                                            borderRadius: '6px',
                                            flexShrink: 0,
                                            border: '1px solid #334155',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="color"
                                                value={secondaryColor}
                                                onChange={(e) => onChange(colorKeys.secondary, e.target.value)}
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
                            </div>
                        </div>
                    )}

                    {showLogo && (
                        <div style={{ marginBottom: children ? '2rem' : '0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffa305', textTransform: 'uppercase' }}>
                                    {logoLabel}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                    {logoHelpText}
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', paddingBottom: '0.5rem' }}>
                                {/* Remove/Clear Option */}
                                <div
                                    onClick={() => {
                                        if (logoKey.includes('.')) {
                                            const keys = logoKey.split('.');
                                            onChange(keys[0], { ...getValue(keys[0]), [keys[1]]: null });
                                        } else {
                                            onChange(logoKey, null);
                                        }
                                    }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        border: '1px solid #334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        background: '#020617',
                                        flexShrink: 0,
                                        color: '#94a3b8'
                                    }}
                                    title="Remove Logo"
                                >
                                    <X size={24} />
                                </div>

                                {/* Logo Presets */}
                                {logoOptions && logoOptions.map(img => (
                                    <div
                                        key={img.id}
                                        onClick={() => {
                                            if (logoKey.includes('.')) {
                                                const keys = logoKey.split('.');
                                                onChange(keys[0], { ...getValue(keys[0]), [keys[1]]: img.url });
                                            } else {
                                                onChange(logoKey, { url: img.url });
                                            }
                                        }}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: currentLogoUrl === img.url ? '3px solid #ffa305' : '2px solid #334155',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            flexShrink: 0,
                                            background: '#0f172a'
                                        }}
                                    >
                                        <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {currentLogoUrl === img.url && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                width: '22px',
                                                height: '22px',
                                                background: '#ffa305',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #334155',
                                                color: '#fff',
                                                fontSize: '12px',
                                                fontWeight: 700
                                            }}>
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Custom Uploaded Logo (if not in presets) */}
                                {currentLogoUrl && !logoOptions?.some(o => o.url === currentLogoUrl) && (
                                    <div
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '3px solid #ffa305',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            flexShrink: 0
                                        }}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <img src={currentLogoUrl} alt="Custom Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{
                                            position: 'absolute',
                                            top: '0',
                                            left: '0',
                                            width: '22px',
                                            height: '22px',
                                            background: '#ffa305',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid #334155',
                                            zIndex: 2,
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 700
                                        }}>
                                            ✓
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
                                                <Eye size={24} color="#fff" />
                                                <span style={{ color: '#fff', fontSize: '10px', marginTop: '4px' }}>Preview</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Upload Option */}
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <div
                                        onClick={triggerFileUpload}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            border: '1px dashed #334155',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            flexShrink: 0,
                                            background: '#0f172a'
                                        }}
                                    >
                                        <UploadCloud size={24} color="#94a3b8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Shape Selection */}
                    {showLogo && logoShapeKey && (
                        <div style={{ marginBottom: children ? '2rem' : '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                SHAPE
                            </label>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="shape"
                                        checked={getValue(logoShapeKey) !== 'rectangular'} // Default to circular
                                        onChange={() => {
                                            if (logoShapeKey.includes('.')) {
                                                const keys = logoShapeKey.split('.');
                                                onChange(keys[0], { ...getValue(keys[0]), [keys[1]]: 'circular' });
                                            } else {
                                                onChange(logoShapeKey, 'circular');
                                            }
                                        }}
                                        style={{ width: '16px', height: '16px', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#f8fafc' }}>Circular</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="shape"
                                        checked={getValue(logoShapeKey) === 'rectangular'}
                                        onChange={() => {
                                            if (logoShapeKey.includes('.')) {
                                                const keys = logoShapeKey.split('.');
                                                onChange(keys[0], { ...getValue(keys[0]), [keys[1]]: 'rectangular' });
                                            } else {
                                                onChange(logoShapeKey, 'rectangular');
                                            }
                                        }}
                                        style={{ width: '16px', height: '16px', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#f8fafc' }}>Rectangular</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isModalOpen && currentLogoUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
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
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={currentLogoUrl} alt="Logo Preview" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px', display: 'block' }} />
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    right: '-12px',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#94a3b8',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                                }}
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reusable Upload/Edit Modal */}
            <ImageUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => {
                    setIsUploadModalOpen(false);
                    setTempImage(null);
                }}
                onSave={handleSaveLogo}
                tempImage={tempImage}
                fileName={fileName}
                type="logo"
            />
        </motion.div>
    );
};

export default ReusableDesignAccordion;
