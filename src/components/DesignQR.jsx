import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Upload, X, ArrowRight } from 'lucide-react';
import FormSection from './FormSection';
import ColorPicker from './ColorPicker';

const DesignQR = ({ design, setDesign, qrData, setQrData, onSave, qrName, setQrName, isGenerating, isEditing }) => {

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setDesign(prev => ({
                    ...prev,
                    image: { ...prev.image, url: reader.result }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSocialLogoSelect = (social) => {
        setDesign(prev => ({
            ...prev,
            image: { ...prev.image, url: social.src }
        }));
    };

    const socialLogos = [
        { id: 'facebook', src: 'https://img.icons8.com/color/96/facebook-new.png', label: 'Facebook' },
        { id: 'instagram', src: 'https://img.icons8.com/fluency/96/instagram-new.png', label: 'Instagram' },
        { id: 'x', src: 'https://img.icons8.com/ios-filled/96/000000/twitterx.png', label: 'X' },
        { id: 'linkedin', src: 'https://img.icons8.com/color/96/linkedin.png', label: 'LinkedIn' },
        { id: 'discord', src: 'https://img.icons8.com/color/96/discord-logo-2.png', label: 'Discord' },
        { id: 'twitch', src: 'https://img.icons8.com/color/96/twitch.png', label: 'Twitch' },
        { id: 'kickstarter', src: 'https://img.icons8.com/color/96/kickstarter.png', label: 'Kickstarter' },
        { id: 'youtube', src: 'https://img.icons8.com/color/96/youtube-play.png', label: 'YouTube' },
        { id: 'whatsapp', src: 'https://img.icons8.com/color/96/whatsapp.png', label: 'WhatsApp' },
        { id: 'snapchat', src: 'https://img.icons8.com/color/96/snapchat-circled.png', label: 'Snapchat' },
        { id: 'tiktok', src: 'https://img.icons8.com/color/96/tiktok.png', label: 'TikTok' },
        { id: 'tumblr', src: 'https://img.icons8.com/color/96/tumblr.png', label: 'Tumblr' },
        { id: 'spotify', src: 'https://img.icons8.com/color/96/spotify.png', label: 'Spotify' },
        { id: 'dribbble', src: 'https://img.icons8.com/color/96/dribbble.png', label: 'Dribbble' },
        { id: 'pinterest', src: 'https://img.icons8.com/color/96/pinterest.png', label: 'Pinterest' },
        { id: 'telegram', src: 'https://img.icons8.com/color/96/telegram-app.png', label: 'Telegram' },
        { id: 'behance', src: 'https://img.icons8.com/color/96/behance.png', label: 'Behance' },
        { id: 'reddit', src: 'https://img.icons8.com/color/96/reddit.png', label: 'Reddit' },
        { id: 'web', src: 'https://img.icons8.com/color/96/internet.png', label: 'Web' },
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>

            {/* QR NAME */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#0f172a' }}>QR Code Name</label>
                <input
                    type="text"
                    value={qrName}
                    onChange={(e) => setQrName(e.target.value)}
                    placeholder="Enter QR name..."
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        outline: 'none'
                    }}
                />
            </div>

            {/* SHAPE & COLOR */}
            <FormSection title="SHAPE & COLOR" defaultOpen={true}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Body Patterns */}
                    <div>
                        <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>BODY PATTERNS</label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {[
                                { id: 'square', svg: <rect x="2" y="2" width="46" height="46" fill="currentColor" /> },
                                { id: 'dots', svg: <><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="38" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="38" r="6" fill="currentColor" /><circle cx="38" cy="38" r="6" fill="currentColor" /></> },
                                { id: 'classy', svg: <path d="M25 2L48 25L25 48L2 25Z" fill="currentColor" /> },
                                { id: 'rounded', svg: <rect x="2" y="2" width="46" height="46" rx="12" fill="currentColor" /> },
                                { id: 'extra-rounded', svg: <rect x="2" y="2" width="46" height="46" rx="23" fill="currentColor" /> },
                            ].map((p, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setDesign(prev => ({ ...prev, dots: { ...prev.dots, style: p.id } }))}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        border: design?.dots?.style === p.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fff',
                                        color: '#000',
                                        padding: '8px'
                                    }}
                                >
                                    <svg viewBox="0 0 50 50" width="100%" height="100%">
                                        {p.svg}
                                    </svg>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px dashed #e2e8f0', margin: '1.5rem 0' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Pattern Color</label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                background: '#fff',
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.dots?.color || '#000000'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.dots?.color || '#000000'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, dots: { ...prev.dots, color: e.target.value } }))}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: design?.dots?.color || '#000000',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                    {/* Eye Frame (Outer Square) */}
                    <div>
                        <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>EYE FRAME (OUTER SQUARE)</label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {[
                                { id: 'square', svg: <path d="M5 5h40v40H5V5zm5 5v30h30V10H10z" fill="currentColor" /> },
                                { id: 'circle', svg: <path d="M25 5C13.95 5 5 13.95 5 25s8.95 20 20 20 20-8.95 20-20S36.05 5 25 5zm0 5c8.28 0 15 6.72 15 15s-6.72 15-15 15-15-6.72-15-15 6.72-15 15-15z" fill="currentColor" /> },
                                { id: 'rounded', svg: <path d="M12 5h26c3.87 0 7 3.13 7 7v26c0 3.87-3.13 7-7 7H12c-3.87 0-7-3.13-7-7V12c0-3.87 3.13-7 7-7zm0 5c-1.1 0-2 .9-2 2v26c0 1.1.9 2 2 2h26c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2H12z" fill="currentColor" /> },
                                { id: 'extra-rounded', svg: <path d="M18 5h14c7.18 0 13 5.82 13 13v14c0 7.18-5.82 13-13 13H18c-7.18 0-13-5.82-13-13V18c0-7.18 5.82-13 13-13zm0 5c-4.42 0-8 3.58-8 8v14c0 4.42 3.58 8 8 8h14c4.42 0 8-3.58 8-8V18c0-4.42-3.58-8-8-8H18z" fill="currentColor" /> },
                                { id: 'leaf-top-right', svg: <path d="M12 5h26c3.87 0 7 3.13 7 7v26c0 3.87-3.13 7-7 7H12c-3.87 0-7-3.13-7-7V12c0-3.87 3.13-7 7-7zM38 10h-7v5h7c1.1 0 2 .9 2 2v21c0 1.1-.9 2-2 2H12c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h19v-5H12c-1.1 0-2 .9-2 2v26c0 1.1.9 2 2 2h26c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2z" fill="currentColor" /> },
                                { id: 'leaf-bottom-left', svg: <path d="M12 5h26c3.87 0 7 3.13 7 7v26c0 3.87-3.13 7-7 7H12c-3.87 0-7-3.13-7-7V12c0-3.87 3.13-7 7-7zm0 35h7v-5h-7c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h26c1.1 0 2 .9 2 2v26c0 1.1-.9 2-2 2H19v5h19c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2H12c-1.1 0-2 .9-2 2v21c0 1.1.9 2 2 2z" fill="currentColor" /> },
                                { id: 'dot-frame', svg: <><path d="M5 5h40v40H5V5zm5 5v30h30V10H10z" fill="currentColor" /><circle cx="25" cy="25" r="3" fill="currentColor" /></> },
                            ].map((f, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, style: f.id } }))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: design?.cornersSquare?.style === f.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fff',
                                        color: '#000',
                                        padding: '6px'
                                    }}
                                >
                                    <svg viewBox="0 0 50 50" width="100%" height="100%">
                                        {f.svg}
                                    </svg>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px dashed #e2e8f0', margin: '1rem 0' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Frame Color</label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                background: '#fff',
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.cornersSquare?.color || design?.dots?.color || '#000000'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.cornersSquare?.color || design?.dots?.color || '#000000'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, color: e.target.value } }))}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: design?.cornersSquare?.color || design?.dots?.color || '#000000',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                    {/* Eye Ball (Inner Dot) */}
                    <div>
                        <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>EYE BALL (INNER DOT)</label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {[
                                { id: 'dot', svg: <circle cx="25" cy="25" r="14" fill="currentColor" /> },
                                { id: 'square', svg: <rect x="11" y="11" width="28" height="28" fill="currentColor" /> },
                                { id: 'extra-rounded', svg: <rect x="11" y="11" width="28" height="28" rx="8" fill="currentColor" /> },
                                { id: 'diamond', svg: <path d="M25 5 L45 25 L25 45 L5 25 Z" fill="currentColor" transform="scale(0.7) translate(10,10)" /> },
                                { id: 'leaf-1', svg: <path d="M10 25 Q10 10 25 10 L40 10 L40 25 Q40 40 25 40 L10 40 Z" fill="currentColor" transform="scale(0.8) translate(6,6)" /> },
                                { id: 'leaf-2', svg: <path d="M10 10 L25 10 Q40 10 40 25 L40 40 L25 40 Q10 40 10 25 Z" fill="currentColor" transform="scale(0.8) translate(6,6)" /> },
                                { id: 'leaf-3', svg: <path d="M10 10 L25 10 L40 10 L40 25 Q40 40 25 40 Q10 40 10 25 Z" fill="currentColor" transform="scale(0.8) translate(6,6)" /> },
                                { id: 'star', svg: <path d="M25 8 L30 18 L41 19 L32 26 L35 37 L25 31 L15 37 L18 26 L9 19 L20 18 Z" fill="currentColor" /> },
                                { id: 'plus', svg: <path d="M20 10 H30 V20 H40 V30 H30 V40 H20 V30 H10 V20 H20 Z" fill="currentColor" /> },
                                { id: 'cross', svg: <path d="M15 10 L25 20 L35 10 L40 15 L30 25 L40 35 L35 40 L25 30 L15 40 L10 35 L20 25 L10 15 Z" fill="currentColor" /> },
                            ].map((b, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, style: b.id } }))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: design?.cornersDot?.style === b.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fff',
                                        color: '#000',
                                        padding: '6px'
                                    }}
                                >
                                    <svg viewBox="0 0 50 50" width="100%" height="100%">
                                        {b.svg}
                                    </svg>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px dashed #e2e8f0', margin: '1rem 0' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Ball Color</label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                background: '#fff',
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.cornersDot?.color || design?.dots?.color || '#000000'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.cornersDot?.color || design?.dots?.color || '#000000'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, color: e.target.value } }))}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: design?.cornersDot?.color || design?.dots?.color || '#000000',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                    {/* Background Color */}
                    <div>
                        <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>BACKGROUND COLOR</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Background Color</label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                background: '#fff',
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.background?.color || '#ffffff'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.background?.color || '#ffffff'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, background: { ...prev.background, color: e.target.value } }))}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: design?.background?.color || '#ffffff',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormSection>

            {/* SELECT A LOGO */}
            <FormSection title="SELECT A LOGO">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>This will appear at the center of your QR Code</div>

                    {/* Upload Area */}
                    <div
                        onClick={() => document.getElementById('logo-upload').click()}
                        style={{
                            border: '2px dashed #e2e8f0',
                            borderRadius: '8px',
                            padding: '2rem',
                            textAlign: 'center',
                            background: '#f8fafc',
                            cursor: 'pointer'
                        }}
                    >
                        <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleLogoUpload}
                        />
                        <Upload size={24} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>
                            Drag file here or <span style={{ color: '#8b5cf6' }}>browse</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                            192x192 pixels. 5MB max file size.
                        </div>
                    </div>

                    {/* Remove Background Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                            onClick={() => setDesign(prev => ({
                                ...prev,
                                imageOptions: { ...prev.imageOptions, hideBackgroundDots: !prev.imageOptions?.hideBackgroundDots }
                            }))}
                            style={{
                                width: '44px',
                                height: '24px',
                                background: design?.imageOptions?.hideBackgroundDots ? '#cbd5e1' : '#e2e8f0', // Inactive look for track, usually active is colored but user asked for "Remove Background Behind Logo" functionality.
                                // Actually standard toggle: grey = off, color = on. 
                                // Let's check the image. The image shows a toggle that is OFF (grey).
                                // When active it should probably be purple.
                                background: design?.imageOptions?.hideBackgroundDots ? '#8b5cf6' : '#cbd5e1',
                                borderRadius: '12px',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                background: '#fff',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: design?.imageOptions?.hideBackgroundDots ? '22px' : '2px',
                                transition: 'left 0.2s',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}></div>
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1e293b' }}>Remove Background Behind Logo</span>
                    </div>

                    {/* Social Logos */}
                    <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {socialLogos.map((social) => (
                                <div
                                    key={social.id}
                                    onClick={() => handleSocialLogoSelect(social)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        padding: '4px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fff',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                >
                                    <img src={social.src} alt={social.label} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logo Size Slider */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Logo Size</label>
                        <input
                            type="range"
                            min="0.1"
                            max="0.5"
                            step="0.05"
                            value={design?.imageOptions?.imageSize || 0.4}
                            onChange={(e) => setDesign(prev => ({
                                ...prev,
                                imageOptions: { ...prev.imageOptions, imageSize: parseFloat(e.target.value) }
                            }))}
                            style={{
                                width: '100%',
                                height: '4px',
                                background: '#e2e8f0',
                                borderRadius: '2px',
                                outline: 'none',
                                cursor: 'pointer',
                                accentColor: '#8b5cf6'
                            }}
                        />
                    </div>
                </div>
            </FormSection>

            {/* SAVE BUTTON */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onSave}
                    disabled={isGenerating || !qrName.trim()}
                    style={{
                        background: isGenerating || !qrName.trim() ? '#e2e8f0' : 'linear-gradient(to right, #6366f1, #8b5cf6)',
                        color: isGenerating || !qrName.trim() ? '#94a3b8' : '#ffffff',
                        border: 'none',
                        padding: '0.875rem 2rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: isGenerating || !qrName.trim() ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.95rem'
                    }}
                >
                    {isGenerating ? 'Saving...' : (isEditing ? 'Update QR Code' : 'Save QR Code')}
                    {!isGenerating && <ArrowRight size={18} />}
                </button>
            </div>
        </div>
    );
};

export default DesignQR;
