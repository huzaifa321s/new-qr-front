import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, UploadCloud, Check } from 'lucide-react';
import ReusableDesignAccordion from './ReusableDesignAccordion';
import ImageUploadModal from './ImageUploadModal';
import FileUploader from './FileUploader';
import axios from 'axios';

const AppStoreConfig = ({ config, onChange }) => {
    // Accordion States
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isAppLinksOpen, setIsAppLinksOpen] = useState(false);
    const [isAppStatusOpen, setIsAppStatusOpen] = useState(false);

    // Helpers
    const updateConfig = (path, value) => {
        const newConfig = JSON.parse(JSON.stringify(config));
        const keys = path.split('.');
        let pointer = newConfig;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!pointer[keys[i]]) pointer[keys[i]] = {};
            pointer = pointer[keys[i]];
        }
        pointer[keys[keys.length - 1]] = value;
        onChange(newConfig);
    };

    const getValue = (path) => {
        return path.split('.').reduce((obj, key) => obj?.[key], config) || '';
    };

    const handleVideoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('video', file);

            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
            const res = await axios.post(`${baseUrl}api/upload/video`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            updateConfig('appStatus.fileUrl', res.data.url);
        } catch (err) {
            console.error('Video upload failed:', err);
            alert('Video upload failed');
        }
    };

    // Palettes
    const palettes = [
        { p: '#0f3485', s: '#ff9500' }, // Blue Orange
        { p: '#facc15', s: '#fef08a' }, // Yellow
        { p: '#ffa305', s: '#ffd89a' }, // Orange
        { p: '#22c55e', s: '#86efac' }, // Green
        { p: '#06b6d4', s: '#67e8f9' }  // Cyan
    ];

    const logoOptions = [
        { id: 'app1', url: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=150&h=150&fit=crop' },
        { id: 'app2', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&h=150&fit=crop' },
        { id: 'app3', url: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=150&h=150&fit=crop' },
        { id: 'app4', url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=150&h=150&fit=crop' }
    ];

    const design = config.design || {};
    // Map existing structure to expected ReusableDesignAccordion structure
    const mappedDesign = {
        ...design,
        primaryColor: design.color?.dark,
        secondaryColor: design.color?.light,
        logo: { url: design.appLogo?.url }
    };

    const commonInputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: '#020617',
        border: '1px solid #334155',
        borderRadius: '8px',
        color: '#e5e7eb',
        fontSize: '0.9rem',
        outline: 'none'
    };

    const commonLabelStyle = {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: '700',
        color: '#94a3b8',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em'
    };

    return (
        <div>
            {/* DESIGN Section */}
            <ReusableDesignAccordion
                design={mappedDesign}
                onPaletteChange={(p, s) => {
                    const newConfig = JSON.parse(JSON.stringify(config));
                    if (!newConfig.design) newConfig.design = {};
                    if (!newConfig.design.color) newConfig.design.color = {};
                    newConfig.design.color.dark = p;
                    newConfig.design.color.light = s;
                    onChange(newConfig);
                }}
                onChange={(key, val) => {
                    if (key === 'primaryColor') updateConfig('design.color.dark', val);
                    else if (key === 'secondaryColor') updateConfig('design.color.light', val);
                    else if (key === 'logo.url') updateConfig('design.appLogo.url', val);
                    else if (key === 'logo') {
                        // ReusableDesignAccordion passes the whole logo object when logoKey is 'logo.url'
                        if (val && val.url !== undefined) {
                            updateConfig('design.appLogo.url', val.url);
                        }
                    }
                }}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'primaryColor', secondary: 'secondaryColor' }}
                palettes={palettes}
                logoKey="logo.url"
                showLogo={true}
                logoLabel="LOGO"
                logoOptions={logoOptions}
            />

            {/* BASIC INFORMATION Section */}
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
                            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* App Name */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <label style={commonLabelStyle}>APP NAME*</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="color"
                                                value={getValue('businessInfo.titleColor') || '#000000'}
                                                onChange={(e) => updateConfig('businessInfo.titleColor', e.target.value)}
                                                style={{ width: '30px', height: '30px', padding: 0, border: '1px solid #334155', borderRadius: '4px', background: 'none', cursor: 'pointer' }}
                                            />
                                            <select
                                                style={{ ...commonInputStyle, padding: '0.25rem 0.5rem', width: 'auto', fontSize: '0.8rem' }}
                                                value={getValue('businessInfo.titleFont') || 'Lato'}
                                                onChange={(e) => updateConfig('businessInfo.titleFont', e.target.value)}
                                            >
                                                <option value="Lato">Lato</option>
                                                <option value="Work Sans">Work Sans</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input
                                        style={commonInputStyle}
                                        value={getValue('businessInfo.title')}
                                        onChange={(e) => updateConfig('businessInfo.title', e.target.value)}
                                        placeholder="Techoid Bank"
                                    />
                                </div>

                                {/* Detail */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <label style={commonLabelStyle}>DETAIL</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="color"
                                                value={getValue('businessInfo.subtitleColor') || '#4b5563'}
                                                onChange={(e) => updateConfig('businessInfo.subtitleColor', e.target.value)}
                                                style={{ width: '30px', height: '30px', padding: 0, border: '1px solid #334155', borderRadius: '4px', background: 'none', cursor: 'pointer' }}
                                            />
                                            <select
                                                style={{ ...commonInputStyle, padding: '0.25rem 0.5rem', width: 'auto', fontSize: '0.8rem' }}
                                                value={getValue('businessInfo.subtitleFont') || 'Lato'}
                                                onChange={(e) => updateConfig('businessInfo.subtitleFont', e.target.value)}
                                            >
                                                <option value="Lato">Lato</option>
                                                <option value="Work Sans">Work Sans</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input
                                        style={commonInputStyle}
                                        value={getValue('businessInfo.subtitle')}
                                        onChange={(e) => updateConfig('businessInfo.subtitle', e.target.value)}
                                        placeholder="Technician name"
                                    />
                                </div>

                                {/* Title (Call to Action) */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <label style={commonLabelStyle}>TITLE*</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="color"
                                                value={getValue('businessInfo.ctaColor') || '#000000'}
                                                onChange={(e) => updateConfig('businessInfo.ctaColor', e.target.value)}
                                                style={{ width: '30px', height: '30px', padding: 0, border: '1px solid #334155', borderRadius: '4px', background: 'none', cursor: 'pointer' }}
                                            />
                                            <select
                                                style={{ ...commonInputStyle, padding: '0.25rem 0.5rem', width: 'auto', fontSize: '0.8rem' }}
                                                value={getValue('businessInfo.ctaFont') || 'Lato'}
                                                onChange={(e) => updateConfig('businessInfo.ctaFont', e.target.value)}
                                            >
                                                <option value="Lato">Lato</option>
                                                <option value="Work Sans">Work Sans</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input
                                        style={commonInputStyle}
                                        value={getValue('businessInfo.cta') || 'DOWNLOAD NOW'}
                                        onChange={(e) => updateConfig('businessInfo.cta', e.target.value)}
                                        placeholder="Download Now"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label style={commonLabelStyle}>DESCRIPTION</label>
                                    <textarea
                                        style={{ ...commonInputStyle, resize: 'vertical' }}
                                        rows={4}
                                        value={getValue('businessInfo.description')}
                                        onChange={(e) => updateConfig('businessInfo.description', e.target.value)}
                                        placeholder="Control all your finances easily and quickly."
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <label style={commonLabelStyle}>WEBSITE</label>
                                    <input
                                        style={commonInputStyle}
                                        value={getValue('businessInfo.website') || 'https://www.techoid.com'}
                                        onChange={(e) => updateConfig('businessInfo.website', e.target.value)}
                                        placeholder="https://www.techoid.com"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* APP LINKS Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsAppLinksOpen(!isAppLinksOpen)}
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
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'none' }}>App Links</div>
                    <motion.div animate={{ rotate: isAppLinksOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isAppLinksOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Button Type */}
                                <div>
                                    <label style={commonLabelStyle}>BUTTON TYPE</label>
                                    <div style={{ display: 'flex', gap: '1rem 2rem', flexWrap: 'wrap' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#f8fafc', fontWeight: '500', fontSize: '0.9rem' }}>
                                            <input
                                                type="radio"
                                                name="buttonType"
                                                checked={getValue('appLinks.buttonType') === 'rectangular'}
                                                onChange={() => updateConfig('appLinks.buttonType', 'rectangular')}
                                                style={{ accentColor: '#ffa305' }}
                                            />
                                            Rectangular
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#f8fafc', fontWeight: '500', fontSize: '0.9rem' }}>
                                            <input
                                                type="radio"
                                                name="buttonType"
                                                checked={getValue('appLinks.buttonType') === 'circular'}
                                                onChange={() => updateConfig('appLinks.buttonType', 'circular')}
                                                style={{ accentColor: '#ffa305' }}
                                            />
                                            Circular
                                        </label>
                                    </div>
                                </div>

                                {/* Play Store */}
                                <div>
                                    <label style={commonLabelStyle}>PLAY STORE</label>
                                    {getValue('appLinks.google') ? (
                                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                            <input
                                                style={{ ...commonInputStyle, paddingRight: '2.5rem' }}
                                                value={getValue('appLinks.google')}
                                                onChange={(e) => updateConfig('appLinks.google', e.target.value)}
                                                placeholder="https://"
                                            />
                                            <button
                                                onClick={() => updateConfig('appLinks.google', '')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '0.5rem',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#94a3b8',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '4px'
                                                }}
                                                title="Remove link"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            onClick={() => updateConfig('appLinks.google', 'https://')}
                                            style={{
                                                background: '#ffa305',
                                                border: 'none',
                                                color: '#0f172a',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                width: '100%'
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            + Add Play Store
                                        </motion.button>
                                    )}
                                </div>

                                {/* App Store */}
                                <div>
                                    <label style={commonLabelStyle}>APP STORE</label>
                                    {getValue('appLinks.apple') ? (
                                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                            <input
                                                style={{ ...commonInputStyle, paddingRight: '2.5rem' }}
                                                value={getValue('appLinks.apple')}
                                                onChange={(e) => updateConfig('appLinks.apple', e.target.value)}
                                                placeholder="https://"
                                            />
                                            <button
                                                onClick={() => updateConfig('appLinks.apple', '')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '0.5rem',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#94a3b8',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '4px'
                                                }}
                                                title="Remove link"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            onClick={() => updateConfig('appLinks.apple', 'https://')}
                                            style={{
                                                background: '#ffa305',
                                                border: 'none',
                                                color: '#0f172a',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                width: '100%'
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            + Add App Store
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* APP STATUS Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsAppStatusOpen(!isAppStatusOpen)}
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
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'none' }}>App Status</div>
                    <motion.div animate={{ rotate: isAppStatusOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isAppStatusOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Launch Date */}
                                <div>
                                    <label style={commonLabelStyle}>LAUNCH DATE</label>
                                    <input
                                        type="date"
                                        style={commonInputStyle}
                                        value={getValue('appStatus.launchDate')}
                                        onChange={(e) => updateConfig('appStatus.launchDate', e.target.value)}
                                    />
                                </div>

                                {/* Type (Image/Video) */}
                                <div>
                                    <label style={commonLabelStyle}>TYPE</label>
                                    <div style={{ display: 'flex', gap: '1rem 2rem', flexWrap: 'wrap' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#f8fafc', fontWeight: '500', fontSize: '0.9rem' }}>
                                            <input
                                                type="radio"
                                                name="statusType"
                                                checked={getValue('appStatus.type') === 'image'}
                                                onChange={() => updateConfig('appStatus.type', 'image')}
                                                style={{ accentColor: '#ffa305' }}
                                            />
                                            Image
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#f8fafc', fontWeight: '500', fontSize: '0.9rem' }}>
                                            <input
                                                type="radio"
                                                name="statusType"
                                                checked={getValue('appStatus.type') === 'video'}
                                                onChange={() => updateConfig('appStatus.type', 'video')}
                                                style={{ accentColor: '#ffa305' }}
                                            />
                                            Video
                                        </label>
                                    </div>
                                </div>

                                {/* File Upload / Video Input */}
                                {getValue('appStatus.type') === 'video' ? (
                                    <div>
                                        <label style={commonLabelStyle}>UPLOAD VIDEO*</label>

                                        {/* URL Input */}
                                        <input
                                            style={{ ...commonInputStyle, marginBottom: '1rem' }}
                                            value={getValue('appStatus.fileUrl') || ''}
                                            onChange={(e) => updateConfig('appStatus.fileUrl', e.target.value)}
                                            placeholder="Paste URL of your Video"
                                        />

                                        <div style={{ textAlign: 'center', margin: '0.5rem 0', color: '#64748b', fontSize: '0.875rem', fontWeight: '600' }}>OR</div>

                                        {/* Upload Button */}
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: '#ffa305',
                                            color: '#0f172a',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}>
                                            <UploadCloud size={20} />
                                            Upload/ Choose Video from your Computer
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleVideoUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                        <div style={{ textAlign: 'right', marginTop: '0.25rem', fontSize: '0.75rem', color: '#64748b' }}>
                                            10MB max Video size
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <FileUploader
                                            label="Drag file here or browse"
                                            type="status"
                                            currentFile={getValue('appStatus.fileUrl')}
                                            onUpload={(url) => updateConfig('appStatus.fileUrl', url)}
                                        />
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

export default AppStoreConfig;
