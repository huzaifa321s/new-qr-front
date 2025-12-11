import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import ColorPicker from './ColorPicker';
import FileUploader from './FileUploader';
import { ChevronDown, ChevronUp, Upload, Calendar, Image as ImageIcon, Video, UploadCloud, X } from 'lucide-react';
import axios from 'axios';

const AppStoreConfig = ({ config, onChange }) => {
    // Helper to update nested state
    const updateConfig = (path, value) => {
        const keys = path.split('.');
        const lastKey = keys.pop();

        // Deep clone to avoid mutation and ensure re-renders
        const newConfig = JSON.parse(JSON.stringify(config));

        let pointer = newConfig;
        for (const key of keys) {
            if (!pointer[key]) pointer[key] = {};
            pointer = pointer[key];
        }
        pointer[lastKey] = value;
        onChange(newConfig);
    };

    // Helper to get nested value
    const getValue = (path) => {
        return path.split('.').reduce((obj, key) => obj?.[key], config) || '';
    };

    const handleVideoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // You might want to add a loading state here if needed
        try {
            const formData = new FormData();
            formData.append('video', file);

            const res = await axios.post('http://localhost:3000/api/upload/video', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            updateConfig('appStatus.fileUrl', res.data.url);
        } catch (err) {
            console.error('Video upload failed:', err);
            alert('Video upload failed');
        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* DESIGN Section */}
            <FormSection title="DESIGN" defaultOpen={true}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Colors */}
                    <div>
                        <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#8b5cf6', fontWeight: '600', fontSize: '0.9rem' }}>COLORS</label>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                            {/* Preset Color Palettes */}
                            {[
                                { primary: '#0f3485', secondary: '#ff9500', name: 'Blue Orange' },
                                { primary: '#facc15', secondary: '#fef08a', name: 'Yellow' },
                                { primary: '#8b5cf6', secondary: '#c4b5fd', name: 'Purple' },
                                { primary: '#22c55e', secondary: '#86efac', name: 'Green' },
                                { primary: '#06b6d4', secondary: '#67e8f9', name: 'Cyan' }
                            ].map((palette, idx) => {
                                const isSelected = getValue('design.color.dark') === palette.primary;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            const newConfig = JSON.parse(JSON.stringify(config));
                                            newConfig.design = newConfig.design || {};
                                            newConfig.design.color = newConfig.design.color || {};
                                            newConfig.design.color.dark = palette.primary;
                                            newConfig.design.color.light = palette.secondary;
                                            onChange(newConfig);
                                        }}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '50%',
                                            background: `linear-gradient(to bottom, ${palette.primary} 65%, ${palette.secondary} 65%)`,
                                            cursor: 'pointer',
                                            border: '3px solid #fff',
                                            boxShadow: isSelected
                                                ? '0 0 0 2px #8b5cf6, 0 4px 12px rgba(139, 92, 246, 0.3)'
                                                : '0 2px 8px rgba(0,0,0,0.1), 0 0 0 1px #e2e8f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            transition: 'all 0.2s',
                                            transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                                        }}
                                    >
                                        {isSelected && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-6px',
                                                left: '-6px',
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: '#8b5cf6',
                                                border: '2px solid #fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                zIndex: 10
                                            }}>
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <ColorPicker
                                    label="Primary Color"
                                    color={getValue('design.color.dark') || '#0f3485'}
                                    onChange={(c) => {
                                        updateConfig('design.color.dark', c);
                                    }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <ColorPicker
                                    label="Secondary Color"
                                    color={getValue('design.color.light') || '#f3f4f6'}
                                    onChange={(c) => {
                                        updateConfig('design.color.light', c);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Logo */}
                    <div>
                        <label className="label" style={{ marginBottom: '0.5rem', display: 'block' }}>LOGO</label>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>128x128px, 1:1 Ratio</div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            {/* Upload Logo */}
                            <label style={{
                                width: '80px',
                                height: '80px',
                                border: '2px dashed #8b5cf6',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                background: '#f8fafc',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.2s'
                            }}>
                                {getValue('design.logo.url') ? (
                                    <>
                                        <img
                                            src={getValue('design.logo.url')}
                                            alt="logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                updateConfig('design.logo.url', '');
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '-8px',
                                                right: '-8px',
                                                background: '#8b5cf6',
                                                border: 'none',
                                                color: '#fff',
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '18px',
                                                lineHeight: '1',
                                                fontWeight: 'bold',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                            }}
                                            title="Remove logo"
                                        >
                                            ×
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 8v8M8 12h8" />
                                        </svg>
                                        <div style={{
                                            position: 'absolute',
                                            top: '-6px',
                                            right: '-6px',
                                            background: '#8b5cf6',
                                            border: '2px solid #fff',
                                            color: '#fff',
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '14px',
                                            fontWeight: 'bold'
                                        }}>
                                            ✓
                                        </div>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                updateConfig('design.logo.url', event.target?.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    style={{ display: 'none' }}
                                />
                            </label>

                            {/* Preset Icons/Logos */}
                            {[
                                { icon: '❤️', label: 'Heart' },
                                { icon: '🏪', label: 'Shop' },
                                { icon: '⭐', label: 'Star' },
                                { icon: '🎯', label: 'Target' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        // Create SVG for icon
                                        const icons = [
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Ccircle cx="64" cy="64" r="60" fill="%23fff5f5" stroke="%23ec4899" stroke-width="2"/%3E%3Cpath d="M 40 60 L 60 75 L 90 45" stroke="%23ec4899" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E',
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Ccircle cx="64" cy="64" r="60" fill="%23f0fdf4" stroke="%2322c55e" stroke-width="2"/%3E%3Cpath d="M 35 45 L 35 95 Q 35 105 45 105 L 95 105 Q 105 105 105 95 L 105 55 Q 105 45 95 45 L 65 45 Q 55 45 55 55 L 55 95" stroke="%2322c55e" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E',
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Ccircle cx="64" cy="64" r="60" fill="%23fffbeb" stroke="%23f59e0b" stroke-width="2"/%3E%3Cpath d="M 64 35 L 74 60 L 100 60 L 80 75 L 90 100 L 64 85 L 38 100 L 48 75 L 28 60 L 54 60 Z" fill="%23f59e0b"/%3E%3C/svg%3E',
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Ccircle cx="64" cy="64" r="60" fill="%23f0f9ff" stroke="%230ea5e9" stroke-width="2"/%3E%3Ccircle cx="64" cy="64" r="20" fill="none" stroke="%230ea5e9" stroke-width="3"/%3E%3Ccircle cx="64" cy="64" r="3" fill="%230ea5e9"/%3E%3C/svg%3E'
                                        ];
                                        updateConfig('design.logo.url', icons[idx]);
                                    }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: getValue('design.logo.url')?.includes(encodeURI(item.icon)) ? '3px solid #8b5cf6' : '2px solid #e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#f8fafc',
                                        fontSize: '40px'
                                    }}
                                >
                                    {item.icon}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </FormSection>

            {/* BASIC INFORMATION Section */}
            <FormSection title="BASIC INFORMATION">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* App Name */}
                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label className="label">APP NAME*</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="color"
                                    value={getValue('businessInfo.titleColor') || '#000000'}
                                    onChange={(e) => updateConfig('businessInfo.titleColor', e.target.value)}
                                    style={{ width: '30px', height: '30px', padding: 0, border: 'none', background: 'none' }}
                                />
                                <select className="input" style={{ width: '80px', padding: '0.25rem' }}>
                                    <option>Lato</option>
                                </select>
                            </div>
                        </div>
                        <input
                            className="input"
                            value={getValue('businessInfo.title')}
                            onChange={(e) => updateConfig('businessInfo.title', e.target.value)}
                            placeholder="Techoid Bank"
                        />
                    </div>

                    {/* Detail */}
                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label className="label">DETAIL</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="color"
                                    value={getValue('businessInfo.subtitleColor') || '#4b5563'}
                                    onChange={(e) => updateConfig('businessInfo.subtitleColor', e.target.value)}
                                    style={{ width: '30px', height: '30px', padding: 0, border: 'none', background: 'none' }}
                                />
                                <select className="input" style={{ width: '80px', padding: '0.25rem' }}>
                                    <option>Lato</option>
                                </select>
                            </div>
                        </div>
                        <input
                            className="input"
                            value={getValue('businessInfo.subtitle')}
                            onChange={(e) => updateConfig('businessInfo.subtitle', e.target.value)}
                            placeholder="Technician name"
                        />
                    </div>

                    {/* Title (Call to Action) */}
                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label className="label">TITLE*</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="color"
                                    value={getValue('businessInfo.ctaColor') || '#000000'}
                                    onChange={(e) => updateConfig('businessInfo.ctaColor', e.target.value)}
                                    style={{ width: '30px', height: '30px', padding: 0, border: 'none', background: 'none' }}
                                />
                                <select className="input" style={{ width: '80px', padding: '0.25rem' }}>
                                    <option>Lato</option>
                                </select>
                            </div>
                        </div>
                        <input
                            className="input"
                            value={getValue('businessInfo.cta')}
                            onChange={(e) => updateConfig('businessInfo.cta', e.target.value)}
                            placeholder="Download Now"
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label className="label">DESCRIPTION</label>
                        <textarea
                            className="input"
                            rows={4}
                            value={getValue('businessInfo.description')}
                            onChange={(e) => updateConfig('businessInfo.description', e.target.value)}
                            placeholder="Control all your finances easily and quickly."
                        />
                    </div>

                    {/* Website */}
                    <div className="form-group">
                        <label className="label">WEBSITE</label>
                        <input
                            className="input"
                            value={getValue('businessInfo.website')}
                            onChange={(e) => updateConfig('businessInfo.website', e.target.value)}
                            placeholder="https://www.techoid.com"
                        />
                    </div>
                </div>
            </FormSection>

            {/* APP LINKS Section */}
            <FormSection title="APP LINKS">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Button Type */}
                    <div className="form-group">
                        <label className="label">BUTTON TYPE</label>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b', fontWeight: '500' }}>
                                <input
                                    type="radio"
                                    name="buttonType"
                                    checked={getValue('appLinks.buttonType') === 'rectangular'}
                                    onChange={() => updateConfig('appLinks.buttonType', 'rectangular')}
                                    style={{ accentColor: '#8b5cf6' }}
                                />
                                Rectangular
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b', fontWeight: '500' }}>
                                <input
                                    type="radio"
                                    name="buttonType"
                                    checked={getValue('appLinks.buttonType') === 'circular'}
                                    onChange={() => updateConfig('appLinks.buttonType', 'circular')}
                                    style={{ accentColor: '#8b5cf6' }}
                                />
                                Circular
                            </label>
                        </div>
                    </div>

                    {/* Play Store */}
                    <div className="form-group">
                        <label className="label">Play Store</label>
                        {getValue('appLinks.google') ? (
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    className="input"
                                    value={getValue('appLinks.google')}
                                    onChange={(e) => updateConfig('appLinks.google', e.target.value)}
                                    placeholder="https://"
                                    style={{ paddingRight: '2.5rem' }}
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
                            <button
                                onClick={() => updateConfig('appLinks.google', 'https://')}
                                style={{
                                    background: '#8b5cf6',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}
                            >
                                + Add Play Store
                            </button>
                        )}
                    </div>

                    {/* App Store */}
                    <div className="form-group">
                        <label className="label">App Store</label>
                        {getValue('appLinks.apple') ? (
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    className="input"
                                    value={getValue('appLinks.apple')}
                                    onChange={(e) => updateConfig('appLinks.apple', e.target.value)}
                                    placeholder="https://"
                                    style={{ paddingRight: '2.5rem' }}
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
                            <button
                                onClick={() => updateConfig('appLinks.apple', 'https://')}
                                style={{
                                    background: '#8b5cf6',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}
                            >
                                + Add App Store
                            </button>
                        )}
                    </div>
                </div>
            </FormSection>

            {/* APP STATUS Section */}
            <FormSection title="APP STATUS">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Launch Date */}
                    <div className="form-group">
                        <label className="label">LAUNCH DATE</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="date"
                                className="input"
                                value={getValue('appStatus.launchDate')}
                                onChange={(e) => updateConfig('appStatus.launchDate', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Type (Image/Video) */}
                    <div className="form-group">
                        <label className="label">TYPE</label>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b', fontWeight: '500' }}>
                                <input
                                    type="radio"
                                    name="statusType"
                                    checked={getValue('appStatus.type') === 'image'}
                                    onChange={() => updateConfig('appStatus.type', 'image')}
                                    style={{ accentColor: '#8b5cf6' }}
                                />
                                Image
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b', fontWeight: '500' }}>
                                <input
                                    type="radio"
                                    name="statusType"
                                    checked={getValue('appStatus.type') === 'video'}
                                    onChange={() => updateConfig('appStatus.type', 'video')}
                                    style={{ accentColor: '#8b5cf6' }}
                                />
                                Video
                            </label>
                        </div>
                    </div>

                    {/* File Upload / Video Input */}
                    {getValue('appStatus.type') === 'video' ? (
                        <div className="form-group">
                            <label className="label">UPLOAD VIDEO*</label>

                            {/* URL Input */}
                            <input
                                className="input"
                                value={getValue('appStatus.fileUrl') || ''}
                                onChange={(e) => updateConfig('appStatus.fileUrl', e.target.value)}
                                placeholder="Paste URL of your Video"
                                style={{ marginBottom: '1rem' }}
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
                                background: '#8b5cf6',
                                color: '#fff',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600'
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
                        <div className="form-group">
                            <FileUploader
                                label="Drag file here or browse"
                                type="status"
                                currentFile={getValue('appStatus.fileUrl')}
                                onUpload={(url) => updateConfig('appStatus.fileUrl', url)}
                            />
                        </div>
                    )}
                </div>
            </FormSection>

        </div>
    );
};

export default AppStoreConfig;
